// Abstraccion de proveedor de pagos para Nexpost.
// Permite cambiar entre Stripe (legacy de Postiz upstream) y dLocal Go
// (proveedor activo para LATAM) sin tocar el resto del backend.
//
// Si necesitas agregar otro proveedor (MercadoPago, PayPal, etc.) implementar
// esta interface y registrar en billing.provider.factory.ts.

export type BillingProviderName = 'stripe' | 'dlocal_go' | 'none';

export type BillingPeriod = 'MONTHLY' | 'YEARLY';

export type InternalSubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'payment_failed';

export interface CheckoutSessionRequest {
  organizationId: string;
  userId: string;
  userEmail: string;
  planId: string; // FREE | STANDARD | TEAM | PRO | ULTIMATE
  period: BillingPeriod;
  amount: number; // en USD, el proveedor convierte si corresponde
  currency: string; // 'USD' por defecto; dLocal Go convierte a moneda local del pais del usuario
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionResponse {
  // URL externa adonde redirigir al usuario para completar el pago
  checkoutUrl: string;
  // ID propio del proveedor (payment_link_id, session_id, etc.)
  externalId: string;
}

export interface SubscriptionStatusResponse {
  status: InternalSubscriptionStatus;
  planId?: string;
  period?: BillingPeriod;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  trialEndsAt?: Date;
  lastPaymentStatus?: string;
  lastPaymentId?: string;
}

export interface WebhookEventResult {
  // True si el evento se proceso (o si era duplicado y se ignoro).
  processed: boolean;
  // Tipo de evento mapeado (payment_approved, payment_rejected, refund, etc).
  eventType: string;
  // ID externo del evento para idempotencia.
  externalEventId: string;
  // Estado interno resultante despues de aplicar el evento.
  resultingStatus?: InternalSubscriptionStatus;
  // Solo true cuando el evento se proceso por primera vez.
  isNewEvent: boolean;
}

export interface CancelSubscriptionRequest {
  organizationId: string;
  immediate?: boolean; // false = cancel at period end, true = cancel ahora
}

export interface BillingProvider {
  readonly name: BillingProviderName;

  // Crea una sesion/payment-link externa y devuelve URL para redirigir.
  createCheckoutSession(
    req: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse>;

  // Recibe un webhook (raw body + headers), valida firma, garantiza idempotencia,
  // mapea estado externo a interno y persiste el cambio.
  handleWebhook(
    rawBody: Buffer | string,
    headers: Record<string, string | string[] | undefined>
  ): Promise<WebhookEventResult>;

  // Devuelve el estado actual desde el proveedor (consulta directa o cache local).
  getSubscriptionStatus(
    organizationId: string
  ): Promise<SubscriptionStatusResponse>;

  // Cancela la suscripcion del provider externo.
  cancelSubscription(req: CancelSubscriptionRequest): Promise<void>;

  // URL para que el usuario gestione su suscripcion (Stripe Portal, o vista propia).
  // Para dLocal Go: devolver URL interna a /billing porque no hay portal externo.
  getBillingPortalUrl(organizationId: string): Promise<string>;
}
