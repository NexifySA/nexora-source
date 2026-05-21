import { Injectable } from '@nestjs/common';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';
import { SubscriptionRepository } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.repository';
import { IntegrationService } from '@gitroom/nestjs-libraries/database/prisma/integrations/integration.service';
import { OrganizationService } from '@gitroom/nestjs-libraries/database/prisma/organizations/organization.service';
import { Organization } from '@prisma/client';
import dayjs from 'dayjs';
import { makeId } from '@gitroom/nestjs-libraries/services/make.is';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly _subscriptionRepository: SubscriptionRepository,
    private readonly _integrationService: IntegrationService,
    private readonly _organizationService: OrganizationService
  ) {}

  getSubscriptionByOrganizationId(organizationId: string) {
    return this._subscriptionRepository.getSubscriptionByOrganizationId(
      organizationId
    );
  }

  getSubscriptionByOrgId(organizationId: string) {
    return this._subscriptionRepository.getSubscriptionByOrgId(organizationId);
  }

  /**
   * Trial automatico al registrar un usuario nuevo: crea (o resetea a)
   * trialing por 14 dias. Idempotente: si ya existe trial activo, no lo pisa.
   */
  async seedTrial(organizationId: string) {
    if (!organizationId) {
      console.warn('[seedTrial] skipped: organizationId vacio');
      return;
    }
    console.log(`[seedTrial] started organizationId=${organizationId}`);
    const existing =
      await this._subscriptionRepository.getSubscriptionByOrgId(
        organizationId
      );
    if (existing) {
      console.log(
        `[seedTrial] skipped existing subscription id=${existing.id} org=${organizationId}`
      );
      return existing;
    }
    const trialDays = pricing.FREE.trial_days || 14;
    const now = new Date();
    const trialEndsAt = dayjs(now).add(trialDays, 'day').toDate();
    try {
      const created =
        await this._subscriptionRepository.upsertBillingSubscription(
          organizationId,
          {
            subscriptionTier: 'FREE',
            period: 'MONTHLY',
            totalChannels: pricing.FREE.channel || 1,
            billingProvider:
              (process.env.BILLING_PROVIDER as string) || 'dlocal_go',
            planStatus: 'trialing',
            trialEndsAt,
            currentPeriodStart: now,
            currentPeriodEnd: trialEndsAt,
            cancelAtPeriodEnd: false,
          }
        );
      console.log(
        `[seedTrial] created subscription id=${
          (created as any)?.id
        } org=${organizationId} trialEndsAt=${trialEndsAt.toISOString()}`
      );
      return created;
    } catch (err: any) {
      console.error(
        `[seedTrial] failed org=${organizationId} error=${
          err?.message || err
        }`
      );
      throw err;
    }
  }

  /**
   * Aplicar resultado de un webhook de billing (dLocal Go / Stripe) a la
   * Subscription del org. Idempotencia se garantiza arriba (en
   * BillingEvent unique constraint) — aca asumimos que el caller solo
   * llama una vez por evento nuevo.
   */
  async applyBillingWebhook(input: {
    organizationId: string;
    provider: string;
    planId: string;
    period: 'MONTHLY' | 'YEARLY';
    externalSubscriptionId?: string;
    externalPaymentId?: string;
    planStatus:
      | 'trialing'
      | 'active'
      | 'past_due'
      | 'cancelled'
      | 'expired'
      | 'payment_failed';
    externalPaymentStatus?: string;
    paidAt?: Date;
  }) {
    const plan = pricing[input.planId] || pricing.FREE;
    const now = input.paidAt || new Date();

    let currentPeriodStart: Date | null = null;
    let currentPeriodEnd: Date | null = null;

    if (input.planStatus === 'active') {
      currentPeriodStart = now;
      currentPeriodEnd =
        input.period === 'YEARLY'
          ? dayjs(now).add(1, 'year').toDate()
          : dayjs(now).add(1, 'month').toDate();
    } else if (input.planStatus === 'cancelled') {
      // No tocar currentPeriodEnd: la cancelacion entra al fin del periodo.
    }

    return this._subscriptionRepository.upsertBillingSubscription(
      input.organizationId,
      {
        subscriptionTier: (input.planId as any) || 'FREE',
        period: input.period,
        totalChannels: plan.channel ?? 1,
        billingProvider: input.provider,
        billingSubscriptionId: input.externalSubscriptionId,
        planStatus: input.planStatus,
        ...(currentPeriodStart ? { currentPeriodStart } : {}),
        ...(currentPeriodEnd ? { currentPeriodEnd } : {}),
        lastPaymentStatus: input.externalPaymentStatus,
        lastPaymentId: input.externalPaymentId,
        cancelAtPeriodEnd: input.planStatus === 'cancelled',
      }
    );
  }

  useCredit<T>(
    organization: Organization,
    type = 'ai_images',
    func: () => Promise<T>
  ): Promise<T> {
    return this._subscriptionRepository.useCredit(organization, type, func);
  }

  getCode(code: string) {
    return this._subscriptionRepository.getCode(code);
  }

  async deleteSubscription(customerId: string) {
    await this.modifySubscription(
      customerId,
      pricing.FREE.channel || 0,
      'FREE'
    );
    return this._subscriptionRepository.deleteSubscriptionByCustomerId(
      customerId
    );
  }

  updateCustomerId(organizationId: string, customerId: string) {
    return this._subscriptionRepository.updateCustomerId(
      organizationId,
      customerId
    );
  }

  async checkSubscription(organizationId: string, subscriptionId: string) {
    return await this._subscriptionRepository.checkSubscription(
      organizationId,
      subscriptionId
    );
  }

  async modifySubscriptionByOrg(
    organizationId: string,
    totalChannels: number,
    billing: 'FREE' | 'STANDARD' | 'TEAM' | 'PRO' | 'ULTIMATE'
  ) {
    if (!organizationId) {
      return false;
    }

    const getCurrentSubscription =
      (await this._subscriptionRepository.getSubscriptionByOrgId(
        organizationId
      ))!;

    const from = pricing[getCurrentSubscription?.subscriptionTier || 'FREE'];
    const to = pricing[billing];

    const currentTotalChannels = (
      await this._integrationService.getIntegrationsList(organizationId)
    ).filter((f) => !f.disabled);

    if (currentTotalChannels.length > totalChannels) {
      await this._integrationService.disableIntegrations(
        organizationId,
        currentTotalChannels.length - totalChannels
      );
    }

    if (from.team_members && !to.team_members) {
      await this._organizationService.disableOrEnableNonSuperAdminUsers(
        organizationId,
        true
      );
    }

    if (!from.team_members && to.team_members) {
      await this._organizationService.disableOrEnableNonSuperAdminUsers(
        organizationId,
        false
      );
    }

    if (billing === 'FREE') {
      await this._integrationService.changeActiveCron(organizationId);
    }

    return true;
  }

  async modifySubscription(
    customerId: string,
    totalChannels: number,
    billing: 'FREE' | 'STANDARD' | 'TEAM' | 'PRO' | 'ULTIMATE'
  ) {
    if (!customerId) {
      return false;
    }

    const getOrgByCustomerId =
      await this._subscriptionRepository.getOrganizationByCustomerId(
        customerId
      );

    const getCurrentSubscription =
      (await this._subscriptionRepository.getSubscriptionByCustomerId(
        customerId
      ))!;

    if (
      !getOrgByCustomerId ||
      (getCurrentSubscription && getCurrentSubscription?.isLifetime)
    ) {
      return false;
    }

    const from = pricing[getCurrentSubscription?.subscriptionTier || 'FREE'];
    const to = pricing[billing];

    const currentTotalChannels = (
      await this._integrationService.getIntegrationsList(
        getOrgByCustomerId?.id!
      )
    ).filter((f) => !f.disabled);

    if (currentTotalChannels.length > totalChannels) {
      await this._integrationService.disableIntegrations(
        getOrgByCustomerId?.id!,
        currentTotalChannels.length - totalChannels
      );
    }

    if (from.team_members && !to.team_members) {
      await this._organizationService.disableOrEnableNonSuperAdminUsers(
        getOrgByCustomerId?.id!,
        true
      );
    }

    if (!from.team_members && to.team_members) {
      await this._organizationService.disableOrEnableNonSuperAdminUsers(
        getOrgByCustomerId?.id!,
        false
      );
    }

    if (billing === 'FREE') {
      await this._integrationService.changeActiveCron(getOrgByCustomerId?.id!);
    }

    return true;
  }

  async createOrUpdateSubscription(
    isTrailing: boolean,
    identifier: string,
    customerId: string,
    totalChannels: number,
    billing: 'STANDARD' | 'TEAM' | 'PRO' | 'ULTIMATE',
    period: 'MONTHLY' | 'YEARLY',
    cancelAt: number | null,
    code?: string,
    org?: string
  ) {
    if (!code) {
      try {
        const load = await this.modifySubscription(
          customerId,
          totalChannels,
          billing
        );
        if (!load) {
          return {};
        }
      } catch (e) {
        return {};
      }
    }
    return this._subscriptionRepository.createOrUpdateSubscription(
      isTrailing,
      identifier,
      customerId,
      totalChannels,
      billing,
      period,
      cancelAt,
      code,
      org ? { id: org } : undefined
    );
  }

  getSubscriptionByIdentifier(identifier: string) {
    return this._subscriptionRepository.getSubscriptionByIdentifier(identifier);
  }

  async getSubscription(organizationId: string) {
    return this._subscriptionRepository.getSubscription(organizationId);
  }

  async checkCredits(organization: Organization, checkType = 'ai_images') {
    // @ts-ignore
    const type = organization?.subscription?.subscriptionTier || 'FREE';

    if (type === 'FREE') {
      return { credits: 0 };
    }

    // @ts-ignore
    let date = dayjs(organization.subscription.createdAt);
    while (date.isBefore(dayjs())) {
      date = date.add(1, 'month');
    }

    const checkFromMonth = date.subtract(1, 'month');
    const imageGenerationCount =
      checkType === 'ai_images'
        ? pricing[type].image_generation_count
        : pricing[type].generate_videos;

    const totalUse = await this._subscriptionRepository.getCreditsFrom(
      organization.id,
      checkFromMonth,
      checkType
    );

    return {
      credits: imageGenerationCount - totalUse,
    };
  }

  async lifeTime(orgId: string, identifier: string, subscription: any) {
    return this.createOrUpdateSubscription(
      false,
      identifier,
      identifier,
      pricing[subscription].channel!,
      subscription,
      'YEARLY',
      null,
      identifier,
      orgId
    );
  }

  async addSubscription(orgId: string, userId: string, subscription: any) {
    await this._subscriptionRepository.setCustomerId(orgId, userId);
    return this.createOrUpdateSubscription(
      false,
      makeId(5),
      userId,
      pricing[subscription].channel!,
      subscription,
      'MONTHLY',
      null,
      undefined,
      orgId
    );
  }
}
