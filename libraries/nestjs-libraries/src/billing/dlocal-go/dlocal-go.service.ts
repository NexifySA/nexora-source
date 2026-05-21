import { Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { PrismaService } from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import { SubscriptionService } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';
import {
  BillingProvider,
  CancelSubscriptionRequest,
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  InternalSubscriptionStatus,
  SubscriptionStatusResponse,
  WebhookEventResult,
} from '@gitroom/nestjs-libraries/billing/billing.provider.interface';

// dLocal Go billing provider para Nexpost.
//
// IMPORTANTE: la superficie exacta de la API dLocal Go puede variar entre
// payment-links vs subscriptions. Este servicio implementa el patron
// documentado standard:
//
//   Base URL (sandbox):    https://api-sbx.dlocalgo.com/v1
//   Base URL (produccion): https://api.dlocalgo.com/v1
//   Auth:    Authorization: Bearer <API_KEY>:<SECRET_KEY>  (HTTP basic-ish)
//   Webhooks: header X-Signature = HMAC_SHA256(rawBody, DLOCAL_GO_WEBHOOK_SECRET)
//
// Si tu integracion dLocal usa una API diferente, ajustar las constantes
// DLOCAL_API_BASE y los nombres de campos en los DTOs. La firma del webhook
// vive en verifyWebhookSignature() — cambiar el header name si dLocal usa otro.

interface DlocalCheckoutPayload {
  amount: number;
  currency: string;
  country: string;
  description: string;
  notification_url: string;
  success_url: string;
  back_url: string;
  // order_id es el unico identificador merchant-side que la API de
  // dLocal Go devuelve en GET /payments/{id} (la metadata NO se
  // devuelve). Encodeamos aca el contexto org/user/plan/period.
  order_id: string;
  external_id: string;
  payer?: {
    name?: string;
    email: string;
  };
  metadata?: Record<string, string>;
}

// Codifica/parsea el contexto del checkout en el order_id.
// Formato: nexpost_<orgId>_<userId>_<planId>_<period>
// Delimitador '_': dLocal Go valida order_id contra ^[A-Za-z0-9-_]*$
// (rechaza '~', '|', ':'). Los UUID son hex+'-' (sin '_'), planId/
// period son letras; el split es univoco.
const ORDER_ID_PREFIX = 'nexpost';
const ORDER_ID_SEP = '_';
function encodeOrderId(
  organizationId: string,
  userId: string,
  planId: string,
  period: string
): string {
  return [
    ORDER_ID_PREFIX,
    organizationId,
    userId,
    planId,
    period,
  ].join(ORDER_ID_SEP);
}
function decodeOrderId(orderId: string):
  | {
      organizationId: string;
      userId: string;
      planId: string;
      period: 'MONTHLY' | 'YEARLY';
    }
  | null {
  if (!orderId || !orderId.startsWith(ORDER_ID_PREFIX + ORDER_ID_SEP))
    return null;
  const parts = orderId.split(ORDER_ID_SEP);
  if (parts.length !== 5) return null;
  const [, organizationId, userId, planId, period] = parts;
  return {
    organizationId,
    userId,
    planId: (planId || '').toUpperCase(),
    period: (period || '').toUpperCase() === 'YEARLY' ? 'YEARLY' : 'MONTHLY',
  };
}

interface DlocalCheckoutResponse {
  id: string;
  status: string;
  redirect_url: string;
  // estos campos pueden variar — se documenta lo esperado
  [key: string]: unknown;
}

interface DlocalWebhookEvent {
  payment_id?: string;
  id?: string;
  status?: string; // PAID | REJECTED | PENDING | CANCELLED | REFUNDED | EXPIRED
  external_id?: string;
  amount?: number;
  currency?: string;
  paid_at?: string;
  [key: string]: unknown;
}

@Injectable()
export class DlocalGoService implements BillingProvider {
  readonly name = 'dlocal_go' as const;
  private readonly logger = new Logger(DlocalGoService.name);
  private readonly apiBase: string;
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly successUrl: string;
  private readonly cancelUrl: string;
  private readonly notificationUrl: string;
  private readonly defaultCountry: string;
  private readonly enabled: boolean;

  constructor(
    private readonly _prisma: PrismaService,
    private readonly _subscriptionService: SubscriptionService
  ) {
    const env = (process.env.DLOCAL_GO_ENV || 'sandbox').toLowerCase();
    this.apiBase =
      env === 'production'
        ? 'https://api.dlocalgo.com/v1'
        : 'https://api-sbx.dlocalgo.com/v1';
    this.apiKey = process.env.DLOCAL_GO_API_KEY || '';
    this.secretKey = process.env.DLOCAL_GO_SECRET_KEY || '';
    this.successUrl =
      process.env.DLOCAL_GO_SUCCESS_URL ||
      `${process.env.FRONTEND_URL}/billing/success`;
    this.cancelUrl =
      process.env.DLOCAL_GO_CANCEL_URL ||
      `${process.env.FRONTEND_URL}/billing/cancel`;
    this.notificationUrl =
      process.env.DLOCAL_GO_WEBHOOK_URL ||
      `${process.env.FRONTEND_URL}/api/dlocal/webhook`;
    this.defaultCountry = process.env.DLOCAL_GO_DEFAULT_COUNTRY || 'AR';
    this.enabled = !!(this.apiKey && this.secretKey);

    if (!this.enabled) {
      this.logger.warn(
        'dLocal Go no configurado: faltan DLOCAL_GO_API_KEY o DLOCAL_GO_SECRET_KEY'
      );
    }
  }

  private ensureConfigured() {
    if (!this.enabled) {
      throw new Error(
        'dLocal Go no esta configurado. Definir DLOCAL_GO_API_KEY y DLOCAL_GO_SECRET_KEY.'
      );
    }
  }

  private authHeader(): string {
    // dLocal Go usa Bearer con apiKey:secret concatenado.
    return `Bearer ${this.apiKey}:${this.secretKey}`;
  }

  /**
   * El webhook de dLocal Go es "thin": solo trae { payment_id }.
   * Hay que consultar GET /v1/payments/{id} para obtener status real
   * + order_id (la metadata NO la devuelve dLocal Go).
   */
  private async fetchPaymentDetails(paymentId: string): Promise<{
    status: string;
    orderId: string;
    raw: any;
  } | null> {
    try {
      const resp = await fetch(
        `${this.apiBase}/payments/${encodeURIComponent(paymentId)}`,
        {
          method: 'GET',
          headers: { Authorization: this.authHeader() },
        }
      );
      if (!resp.ok) {
        this.logger.error(
          `GET /payments/${paymentId} fallo HTTP ${resp.status}`
        );
        return null;
      }
      const raw: any = await resp.json();
      return {
        status: (raw?.status as string) || '',
        orderId: (raw?.order_id as string) || '',
        raw,
      };
    } catch (err: any) {
      this.logger.error(
        `GET /payments/${paymentId} error: ${err?.message || err}`
      );
      return null;
    }
  }

  /**
   * Si hay una URL pre-creada en dLocal Go para este plan/period
   * (DLOCAL_GO_STANDARD_MONTHLY_URL, etc.), la usamos en lugar de crear un
   * payment nuevo por API. Util cuando dLocal Go solo permite Payment
   * Links pre-armados en lugar de Subscriptions/Smart Field via API.
   *
   * Limitacion: como la URL es pre-creada no podemos inyectar metadata
   * (organizationId, userId, planId) por payload. El webhook va a venir
   * sin esos campos; recomendado configurar success_url=
   * https://nexpost.com.ar/billing/success?orgId={orgId}&plan=PLAN
   * para que despues de pagar el frontend lo confirme manualmente, o
   * usar la API de Subscriptions cuando dLocal la habilite.
   */
  private getPreCreatedPlanUrl(
    planId: string,
    period: 'MONTHLY' | 'YEARLY'
  ): string | null {
    const key = `DLOCAL_GO_${planId.toUpperCase()}_${period.toUpperCase()}_URL`;
    return process.env[key] || null;
  }

  async createCheckoutSession(
    req: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse> {
    // Camino principal: checkout creado por API con metadata
    // (organizationId, userId, planId, period). El webhook va a poder
    // matchear y activar la suscripcion correcta.
    //
    // Fallback manual: solo si NO hay credenciales dLocal Go API
    // (operador eligio Payment Links pre-creados). En ese caso el
    // webhook va a llegar SIN metadata y la activacion tiene que
    // resolverse de otra forma (success_url con orgId, o conciliacion
    // manual). Esto NO es el camino recomendado para produccion.
    if (this.enabled) {
      return this._createCheckoutViaApi(req);
    }

    const preCreated = this.getPreCreatedPlanUrl(req.planId, req.period);
    if (preCreated) {
      this.logger.warn(
        `Fallback Payment Link pre-creado para ${req.planId}/${req.period} ` +
          `(sin API credentials). El webhook va a venir sin metadata.`
      );
      return {
        checkoutUrl: preCreated,
        externalId: `precreated-${req.organizationId}-${req.planId}-${
          req.period
        }-${Date.now()}`,
      };
    }

    this.ensureConfigured(); // tira error claro
    // unreachable
    throw new Error('dLocal Go no configurado');
  }

  private async _createCheckoutViaApi(
    req: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse> {

    const externalId = `nexpost-${req.organizationId}-${req.planId}-${
      req.period
    }-${Date.now()}`;
    // order_id codifica el contexto — es lo unico que vuelve en
    // GET /payments/{id} (la metadata NO la devuelve dLocal Go).
    const orderId = encodeOrderId(
      req.organizationId,
      req.userId,
      req.planId,
      req.period
    );

    const payload: DlocalCheckoutPayload = {
      amount: req.amount,
      currency: req.currency || 'USD',
      country: this.defaultCountry,
      description: `Nexpost ${req.planId} (${req.period.toLowerCase()})`,
      notification_url: this.notificationUrl,
      success_url: req.successUrl || this.successUrl,
      back_url: req.cancelUrl || this.cancelUrl,
      order_id: orderId,
      external_id: externalId,
      payer: { email: req.userEmail },
      metadata: {
        organizationId: req.organizationId,
        userId: req.userId,
        planId: req.planId,
        period: req.period,
        ...(req.metadata || {}),
      },
    };

    const resp = await fetch(`${this.apiBase}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader(),
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      this.logger.error(
        `dLocal Go checkout fallo: HTTP ${resp.status} ${text.slice(0, 300)}`
      );
      throw new Error(`dLocal Go checkout failed: HTTP ${resp.status}`);
    }

    const data = (await resp.json()) as DlocalCheckoutResponse;
    const checkoutUrl =
      (data.redirect_url as string) || (data.checkout_url as string) || '';

    if (!checkoutUrl) {
      this.logger.error(
        'dLocal Go response no incluye redirect_url ni checkout_url',
        data
      );
      throw new Error('dLocal Go did not return a checkout URL');
    }

    return {
      checkoutUrl,
      externalId: data.id || externalId,
    };
  }

  /**
   * Verifica la firma del webhook segun spec oficial de dLocal Go:
   *
   *   Header:  Authorization: V2-HMAC-SHA256, Signature: <hex>
   *   Mensaje: <API_KEY> + <raw JSON body>   (concatenacion)
   *   Key:     <SECRET_KEY>   (la misma secret key de la API, NO un
   *            webhook-secret aparte; dLocal Go no usa uno separado)
   *   Algo:    HMAC-SHA256, comparado en hex
   *
   * Doc: docs.dlocalgo.com — webhook authentication.
   * Si faltan API_KEY/SECRET_KEY (servicio no configurado) se loguea y
   * se rechaza (no aceptamos webhooks sin poder validar en prod).
   */
  private verifyWebhookSignature(
    rawBody: Buffer | string,
    headers: Record<string, string | string[] | undefined>
  ): boolean {
    if (!this.apiKey || !this.secretKey) {
      this.logger.warn(
        'dLocal Go sin API_KEY/SECRET_KEY: no se puede validar firma webhook'
      );
      return false;
    }

    const authHeader =
      (headers['authorization'] as string) ||
      (headers['Authorization'] as string) ||
      '';

    if (!authHeader) {
      this.logger.warn('Webhook recibido sin header Authorization');
      return false;
    }

    // Formato: "V2-HMAC-SHA256, Signature: <hex>"
    const m = authHeader.match(/Signature:\s*([a-fA-F0-9]+)/);
    const provided = m?.[1] || '';
    if (!provided) {
      this.logger.warn(
        `Webhook Authorization sin Signature parseable: ${authHeader.slice(
          0,
          40
        )}`
      );
      return false;
    }

    const bodyStr =
      typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
    const message = `${this.apiKey}${bodyStr}`;
    const expected = createHmac('sha256', this.secretKey)
      .update(message, 'utf8')
      .digest('hex');

    try {
      const a = Buffer.from(expected, 'utf8');
      const b = Buffer.from(provided, 'utf8');
      if (a.length !== b.length) {
        this.logger.warn('Webhook firma no coincide (longitud)');
        return false;
      }
      const ok = timingSafeEqual(a, b);
      if (!ok) this.logger.warn('Webhook firma HMAC no coincide');
      return ok;
    } catch {
      return false;
    }
  }

  /**
   * Mapea estados de dLocal Go a estados internos de Nexpost.
   */
  private mapStatus(externalStatus: string): InternalSubscriptionStatus {
    const s = (externalStatus || '').toUpperCase();
    switch (s) {
      case 'PAID':
      case 'AUTHORIZED':
        return 'active';
      case 'PENDING':
      case 'PROCESSING':
        return 'past_due';
      case 'REJECTED':
      case 'FAILED':
      case 'REJECTED_BY_FRAUD':
        return 'payment_failed';
      case 'CANCELLED':
      case 'VOIDED':
        return 'cancelled';
      case 'REFUNDED':
      case 'PARTIALLY_REFUNDED':
        return 'cancelled';
      case 'EXPIRED':
        return 'expired';
      default:
        return 'past_due';
    }
  }

  async handleWebhook(
    rawBody: Buffer | string,
    headers: Record<string, string | string[] | undefined>
  ): Promise<WebhookEventResult> {
    // Debug: nombres de headers recibidos (sin valores) para confirmar
    // si dLocal Go envia el header Authorization de firma.
    this.logger.log(
      `[webhook] headers recibidos: ${Object.keys(headers || {}).join(', ')}`
    );
    if (!this.verifyWebhookSignature(rawBody, headers)) {
      throw new Error('Invalid dLocal Go webhook signature');
    }

    const bodyStr =
      typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
    let event: DlocalWebhookEvent;
    try {
      event = JSON.parse(bodyStr) as DlocalWebhookEvent;
    } catch {
      throw new Error('Invalid dLocal Go webhook payload (not JSON)');
    }

    // El webhook es "thin": solo trae { payment_id }. Hay que consultar
    // GET /payments/{id} para el status real + order_id (la metadata NO
    // la devuelve dLocal Go).
    const paymentId = (event.payment_id as string) || (event.id as string);
    if (!paymentId) {
      this.logger.warn('Webhook dLocal Go sin payment_id; ignorado');
      return {
        processed: true,
        eventType: 'unknown',
        externalEventId: `noid-${Date.now()}`,
        isNewEvent: false,
      };
    }

    const details = await this.fetchPaymentDetails(paymentId);
    if (!details) {
      // No pudimos consultar el pago: guardamos el evento crudo para
      // auditoria pero NO tocamos Subscription (no sabemos el estado).
      throw new Error(
        `No se pudo consultar GET /payments/${paymentId} — reintentar`
      );
    }

    const externalStatus = details.status || '';
    const status = this.mapStatus(externalStatus);
    const ctx = decodeOrderId(details.orderId);

    // Idempotencia por (payment_id + status): permite PENDING -> PAID
    // (eventos distintos) pero dedupe el mismo status repetido.
    const externalEventId = `${paymentId}-${externalStatus || 'unknown'}`;

    const existing = await (this._prisma as any).billingEvent
      ?.findUnique?.({
        where: {
          provider_externalEventId: {
            provider: 'dlocal_go',
            externalEventId,
          },
        },
      })
      .catch(() => null);

    if (existing) {
      this.logger.log(
        `Webhook dLocal Go duplicado ignorado: ${externalEventId}`
      );
      return {
        processed: true,
        eventType: externalStatus || 'unknown',
        externalEventId,
        resultingStatus: status,
        isNewEvent: false,
      };
    }

    // Guardar evento (payload = detalle completo del pago, mejor para
    // auditoria que el thin webhook).
    await (this._prisma as any).billingEvent
      ?.create?.({
        data: {
          provider: 'dlocal_go',
          externalEventId,
          externalPaymentId: paymentId,
          eventType: externalStatus || 'unknown',
          payload: JSON.stringify(details.raw || {}),
          processedAt: new Date(),
        },
      })
      .catch((err: any) => {
        this.logger.error(
          'No se pudo guardar BillingEvent: ' + (err?.message || err)
        );
      });

    if (ctx?.organizationId && pricing[ctx.planId]) {
      try {
        await this._subscriptionService.applyBillingWebhook({
          organizationId: ctx.organizationId,
          provider: 'dlocal_go',
          planId: ctx.planId,
          period: ctx.period,
          externalSubscriptionId:
            (details.raw?.subscription_id as string) || undefined,
          externalPaymentId: paymentId,
          planStatus: status,
          externalPaymentStatus: externalStatus,
          paidAt: details.raw?.paid_at
            ? new Date(details.raw.paid_at as string)
            : new Date(),
        });
      } catch (err: any) {
        this.logger.error(
          'No se pudo aplicar webhook a Subscription: ' +
            (err?.message || err)
        );
      }
    } else {
      this.logger.warn(
        `Webhook dLocal Go: order_id no parseable (${details.orderId}); solo se guardo BillingEvent. payment=${paymentId}`
      );
    }

    this.logger.log(
      `Webhook dLocal Go procesado: payment=${paymentId} status=${externalStatus} -> ${status} org=${
        ctx?.organizationId || ''
      } plan=${ctx?.planId || ''}`
    );

    return {
      processed: true,
      eventType: externalStatus || 'unknown',
      externalEventId,
      resultingStatus: status,
      isNewEvent: true,
    };
  }

  async getSubscriptionStatus(
    _organizationId: string
  ): Promise<SubscriptionStatusResponse> {
    // dLocal Go: no hay "suscripcion remota" — el estado real vive en
    // la tabla Subscription local (alimentada por webhooks).
    // Esta implementacion delega al subscription.service local — el caller
    // (controller) usa el subscription.service directamente para evitar
    // duplicacion. Devolvemos un default seguro aca.
    return {
      status: 'active',
    };
  }

  async cancelSubscription(_req: CancelSubscriptionRequest): Promise<void> {
    // dLocal Go con payment-links no expone "cancelar suscripcion".
    // El billing.controller marca la fila local Subscription con
    // cancelAtPeriodEnd=true y deja de generar nuevos checkouts.
    // Aca no hay nada que llamar al provider externo.
    this.logger.log(
      'cancelSubscription dLocal Go: noop remoto, cancelacion gestionada localmente'
    );
  }

  async getBillingPortalUrl(_organizationId: string): Promise<string> {
    // dLocal Go no provee portal de cliente. Devolvemos la URL interna.
    return `${process.env.FRONTEND_URL}/billing`;
  }
}
