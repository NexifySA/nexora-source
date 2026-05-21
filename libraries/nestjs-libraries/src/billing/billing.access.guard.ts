import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SubscriptionService } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';

/**
 * Features que requieren billing activo o trial vigente.
 * Cada endpoint marca con @RequireBilling(feature) y el guard valida.
 */
export type BillingFeature =
  | 'integration_create' // crear/conectar nuevo canal social
  | 'post_create' // crear o programar posts
  | 'ai' // funciones de AI (image, video, copilot)
  | 'public_api' // uso de la API publica /public/v1/*
  | 'autopost' // autopost / automation
  | 'team_members'; // invitar miembros al equipo

export const BILLING_FEATURE_KEY = 'nexpost:billing-feature';

/**
 * Decorator: @RequireBilling('integration_create')
 * Aplicar a controllers o handlers que exigen plan activo.
 */
export const RequireBilling = (feature: BillingFeature) =>
  SetMetadata(BILLING_FEATURE_KEY, feature);

/**
 * Estados internos que bloquean (read-only / sin escritura).
 */
const BLOCKING_STATUSES = new Set([
  'expired',
  'cancelled',
  'payment_failed',
  'past_due',
]);

@Injectable()
export class BillingAccessGuard implements CanActivate {
  private readonly logger = new Logger(BillingAccessGuard.name);

  constructor(
    private readonly _reflector: Reflector,
    private readonly _subscriptionService: SubscriptionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Reflexionar handler primero, controller class como fallback
    const feature =
      this._reflector.get<BillingFeature>(
        BILLING_FEATURE_KEY,
        context.getHandler()
      ) ||
      this._reflector.get<BillingFeature>(
        BILLING_FEATURE_KEY,
        context.getClass()
      );
    if (!feature) return true; // sin decorator => no se valida

    // Cortocircuito: si billing esta apagado, no bloquear (entorno self-hosted).
    const billingProvider = process.env.BILLING_PROVIDER || '';
    if (!billingProvider || billingProvider === 'none') return true;

    const req = context.switchToHttp().getRequest();
    const org = req?.org;
    if (!org?.id) {
      throw new HttpException(
        'No organization context',
        HttpStatus.UNAUTHORIZED
      );
    }

    const sub = await this._subscriptionService.getSubscriptionByOrgId(org.id);
    const now = Date.now();
    const planStatus: string =
      (sub as any)?.planStatus || (sub ? 'trialing' : 'expired');
    const planId: string = sub?.subscriptionTier || 'FREE';
    const plan = pricing[planId] || pricing.FREE;

    // 1) Compute effective status: trial vencido o period vencido => expired
    let effective = planStatus;
    if (
      planStatus === 'trialing' &&
      (sub as any)?.trialEndsAt &&
      new Date((sub as any).trialEndsAt).getTime() < now
    ) {
      effective = 'expired';
    }
    if (
      planStatus === 'active' &&
      (sub as any)?.currentPeriodEnd &&
      new Date((sub as any).currentPeriodEnd).getTime() < now
    ) {
      effective = 'expired';
    }

    // 2) AI siempre apagada cuando AI_ENABLED!=true o plan.ai=false.
    if (feature === 'ai') {
      if (process.env.AI_ENABLED !== 'true' || !plan.ai) {
        throw new HttpException(
          'AI features are disabled on your plan',
          HttpStatus.FORBIDDEN
        );
      }
    }

    // 3) Estados que bloquean toda escritura premium.
    if (BLOCKING_STATUSES.has(effective)) {
      throw new HttpException(
        `Tu suscripcion esta en estado "${effective}". Reactiva o renueva tu plan para ${feature}.`,
        HttpStatus.PAYMENT_REQUIRED // 402
      );
    }

    // 4) Limites por plan.
    if (feature === 'public_api' && !plan.public_api) {
      throw new HttpException(
        'API publica no disponible en tu plan',
        HttpStatus.FORBIDDEN
      );
    }
    if (feature === 'autopost' && !plan.autoPost) {
      throw new HttpException(
        'Autopost no disponible en tu plan',
        HttpStatus.FORBIDDEN
      );
    }
    if (feature === 'team_members' && !plan.team_members) {
      throw new HttpException(
        'Equipos no disponibles en tu plan',
        HttpStatus.FORBIDDEN
      );
    }

    // 5) Trial: limita canales y posts.
    if (effective === 'trialing') {
      // El conteo real lo aplica el handler (integration.service / posts.service)
      // contra plan.channel / plan.posts_per_month — aca solo dejamos pasar.
      return true;
    }

    return true;
  }
}
