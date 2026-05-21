import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DlocalGoService } from '@gitroom/nestjs-libraries/billing/dlocal-go/dlocal-go.service';
import { GetOrgFromRequest } from '@gitroom/nestjs-libraries/user/org.from.request';
import { GetUserFromRequest } from '@gitroom/nestjs-libraries/user/user.from.request';
import { Organization, User } from '@prisma/client';
import { SubscriptionService } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';
import {
  BillingPeriod,
  BillingProviderName,
  InternalSubscriptionStatus,
} from '@gitroom/nestjs-libraries/billing/billing.provider.interface';

interface CheckoutDto {
  planId: string;
  period: BillingPeriod;
}

/**
 * Webhook publico de dLocal Go.
 * Va separado del controller autenticado porque dLocal Go llega sin Bearer token.
 */
@ApiTags('dLocal Go Webhook')
@Controller('/dlocal')
export class DlocalWebhookController {
  constructor(private readonly _dlocalGo: DlocalGoService) {}

  @Post('/webhook')
  async webhook(@Req() req: RawBodyRequest<Request>) {
    const rawBody = req.rawBody || JSON.stringify(req.body || {});
    const headers: Record<string, string | string[] | undefined> =
      req.headers as any;

    try {
      const result = await this._dlocalGo.handleWebhook(rawBody, headers);
      return { received: true, isNewEvent: result.isNewEvent };
    } catch (err: any) {
      throw new HttpException(
        err?.message || 'webhook error',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

@ApiTags('dLocal Go')
@Controller('/dlocal')
export class DlocalController {
  constructor(
    private readonly _dlocalGo: DlocalGoService,
    private readonly _subscriptionService: SubscriptionService
  ) {}

  /**
   * Inicia checkout en dLocal Go. Devuelve URL externa.
   */
  @Post('/checkout')
  async checkout(
    @Body() body: CheckoutDto,
    @GetOrgFromRequest() org: Organization,
    @GetUserFromRequest() user: User
  ) {
    if (!body?.planId || !body?.period) {
      throw new HttpException(
        'planId y period son requeridos',
        HttpStatus.BAD_REQUEST
      );
    }
    const plan = pricing[body.planId];
    if (!plan) {
      throw new HttpException('Plan invalido', HttpStatus.BAD_REQUEST);
    }
    const amount =
      body.period === 'YEARLY' ? plan.year_price : plan.month_price;
    if (!amount || amount <= 0) {
      throw new HttpException(
        'Plan no cobrable (precio 0)',
        HttpStatus.BAD_REQUEST
      );
    }

    const res = await this._dlocalGo.createCheckoutSession({
      organizationId: org.id,
      userId: user.id,
      userEmail: user.email,
      planId: body.planId,
      period: body.period,
      amount,
      currency: 'USD',
      successUrl: `${process.env.FRONTEND_URL}/billing/success`,
      cancelUrl: `${process.env.FRONTEND_URL}/billing/cancel`,
    });

    return res;
  }

  /**
   * Estado de la suscripcion para el org actual.
   * - trialing + trialEndsAt < now    => "expired"
   * - active + currentPeriodEnd < now => "expired"
   * - cualquier otro                  => mismo planStatus de la DB
   */
  @Get('/subscription/status')
  async status(@GetOrgFromRequest() org: Organization) {
    const sub = await this._subscriptionService.getSubscriptionByOrgId(org.id);
    if (!sub) {
      return {
        status: 'expired' as InternalSubscriptionStatus,
        planId: 'FREE',
        provider: 'dlocal_go' as BillingProviderName,
      };
    }

    const now = Date.now();
    let computedStatus: InternalSubscriptionStatus =
      ((sub as any).planStatus as InternalSubscriptionStatus) || 'trialing';

    if (
      computedStatus === 'trialing' &&
      (sub as any).trialEndsAt &&
      new Date((sub as any).trialEndsAt).getTime() < now
    ) {
      computedStatus = 'expired';
    }
    if (
      computedStatus === 'active' &&
      (sub as any).currentPeriodEnd &&
      new Date((sub as any).currentPeriodEnd).getTime() < now
    ) {
      computedStatus = 'expired';
    }

    return {
      status: computedStatus,
      planId: sub.subscriptionTier,
      period: (sub.period as BillingPeriod) || 'MONTHLY',
      trialEndsAt: (sub as any).trialEndsAt,
      currentPeriodStart: (sub as any).currentPeriodStart,
      currentPeriodEnd:
        (sub as any).currentPeriodEnd || (sub as any).trialEndsAt,
      cancelAtPeriodEnd:
        (sub as any).cancelAtPeriodEnd || !!sub.cancelAt || false,
      lastPaymentStatus: (sub as any).lastPaymentStatus,
      provider: 'dlocal_go' as BillingProviderName,
    };
  }

  /**
   * Cancelar suscripcion (al fin del periodo).
   */
  @Post('/subscription/cancel')
  async cancel(@GetOrgFromRequest() org: Organization) {
    await this._dlocalGo.cancelSubscription({
      organizationId: org.id,
      immediate: false,
    });
    return { ok: true };
  }
}
