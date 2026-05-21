import { Injectable } from '@nestjs/common';
import {
  PrismaRepository,
  PrismaTransaction,
} from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import dayjs from 'dayjs';
import { Organization } from '@prisma/client';

@Injectable()
export class SubscriptionRepository {
  constructor(
    private readonly _subscription: PrismaRepository<'subscription'>,
    private readonly _organization: PrismaRepository<'organization'>,
    private readonly _user: PrismaRepository<'user'>,
    private readonly _credits: PrismaRepository<'credits'>,
    private _usedCodes: PrismaRepository<'usedCodes'>
  ) {}

  getUserAccount(userId: string) {
    return this._user.model.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        account: true,
        connectedAccount: true,
      },
    });
  }

  getCode(code: string) {
    return this._usedCodes.model.usedCodes.findFirst({
      where: {
        code,
      },
    });
  }

  updateAccount(userId: string, account: string) {
    return this._user.model.user.update({
      where: {
        id: userId,
      },
      data: {
        account,
      },
    });
  }

  getSubscriptionByOrganizationId(organizationId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  updateConnectedStatus(account: string, accountCharges: boolean) {
    return this._user.model.user.updateMany({
      where: {
        account,
      },
      data: {
        connectedAccount: accountCharges,
      },
    });
  }

  getCustomerIdByOrgId(organizationId: string) {
    return this._organization.model.organization.findFirst({
      where: {
        id: organizationId,
      },
      select: {
        paymentId: true,
      },
    });
  }

  checkSubscription(organizationId: string, subscriptionId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId,
        identifier: subscriptionId,
        deletedAt: null,
      },
    });
  }

  deleteSubscriptionByCustomerId(customerId: string) {
    return this._subscription.model.subscription.deleteMany({
      where: {
        organization: {
          paymentId: customerId,
        },
      },
    });
  }

  updateCustomerId(organizationId: string, customerId: string) {
    return this._organization.model.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        paymentId: customerId,
      },
    });
  }

  async getSubscriptionByOrgId(orgId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId: orgId,
      },
    });
  }

  /**
   * Nexpost: upsert generico para billing abstracto (dLocal Go / Stripe).
   * Crea o actualiza la unica Subscription por organizationId con los
   * campos de billing nuevos. Usado por webhook handler y trial seeder.
   */
  async upsertBillingSubscription(
    organizationId: string,
    data: {
      subscriptionTier?:
        | 'FREE'
        | 'STANDARD'
        | 'TEAM'
        | 'PRO'
        | 'ULTIMATE';
      period?: 'MONTHLY' | 'YEARLY';
      totalChannels?: number;
      billingProvider?: string;
      billingCustomerId?: string | null;
      billingSubscriptionId?: string | null;
      planStatus?: string;
      trialEndsAt?: Date | null;
      currentPeriodStart?: Date | null;
      currentPeriodEnd?: Date | null;
      cancelAtPeriodEnd?: boolean;
      lastPaymentStatus?: string | null;
      lastPaymentId?: string | null;
    }
  ) {
    return this._subscription.model.subscription.upsert({
      where: { organizationId },
      create: {
        organizationId,
        subscriptionTier: (data.subscriptionTier || 'FREE') as any,
        period: (data.period || 'MONTHLY') as any,
        totalChannels: data.totalChannels ?? 1,
        billingProvider: data.billingProvider,
        billingCustomerId: data.billingCustomerId,
        billingSubscriptionId: data.billingSubscriptionId,
        planStatus: data.planStatus,
        trialEndsAt: data.trialEndsAt,
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
        lastPaymentStatus: data.lastPaymentStatus,
        lastPaymentId: data.lastPaymentId,
      },
      update: {
        ...(data.subscriptionTier
          ? { subscriptionTier: data.subscriptionTier as any }
          : {}),
        ...(data.period ? { period: data.period as any } : {}),
        ...(typeof data.totalChannels === 'number'
          ? { totalChannels: data.totalChannels }
          : {}),
        ...(data.billingProvider !== undefined
          ? { billingProvider: data.billingProvider }
          : {}),
        ...(data.billingCustomerId !== undefined
          ? { billingCustomerId: data.billingCustomerId }
          : {}),
        ...(data.billingSubscriptionId !== undefined
          ? { billingSubscriptionId: data.billingSubscriptionId }
          : {}),
        ...(data.planStatus !== undefined
          ? { planStatus: data.planStatus }
          : {}),
        ...(data.trialEndsAt !== undefined
          ? { trialEndsAt: data.trialEndsAt }
          : {}),
        ...(data.currentPeriodStart !== undefined
          ? { currentPeriodStart: data.currentPeriodStart }
          : {}),
        ...(data.currentPeriodEnd !== undefined
          ? { currentPeriodEnd: data.currentPeriodEnd }
          : {}),
        ...(typeof data.cancelAtPeriodEnd === 'boolean'
          ? { cancelAtPeriodEnd: data.cancelAtPeriodEnd }
          : {}),
        ...(data.lastPaymentStatus !== undefined
          ? { lastPaymentStatus: data.lastPaymentStatus }
          : {}),
        ...(data.lastPaymentId !== undefined
          ? { lastPaymentId: data.lastPaymentId }
          : {}),
      },
    });
  }

  async getSubscriptionByCustomerId(customerId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organization: {
          paymentId: customerId,
        },
      },
    });
  }

  async getOrganizationByCustomerId(customerId: string) {
    return this._organization.model.organization.findFirst({
      where: {
        paymentId: customerId,
      },
    });
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
    org?: { id: string }
  ) {
    const findOrg =
      org || (await this.getOrganizationByCustomerId(customerId))!;

    if (!findOrg) {
      return;
    }

    await this._subscription.model.subscription.upsert({
      where: {
        organizationId: findOrg.id,
        ...(!code
          ? {
              organization: {
                paymentId: customerId,
              },
            }
          : {}),
      },
      update: {
        subscriptionTier: billing,
        totalChannels,
        period,
        identifier,
        isLifetime: !!code,
        cancelAt: cancelAt ? new Date(cancelAt * 1000) : null,
        deletedAt: null,
      },
      create: {
        organizationId: findOrg.id,
        subscriptionTier: billing,
        isLifetime: !!code,
        totalChannels,
        period,
        cancelAt: cancelAt ? new Date(cancelAt * 1000) : null,
        identifier,
        deletedAt: null,
      },
    });

    await this._organization.model.organization.update({
      where: {
        id: findOrg.id,
      },
      data: {
        isTrailing,
        allowTrial: false,
      },
    });

    if (code) {
      await this._usedCodes.model.usedCodes.create({
        data: {
          code,
          orgId: findOrg.id,
        },
      });
    }
  }

  getSubscriptionByIdentifier(identifier: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        identifier,
        deletedAt: null,
      },
      include: {
        organization: true,
      },
    });
  }

  getSubscription(organizationId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async getCreditsFrom(
    organizationId: string,
    from: dayjs.Dayjs,
    type = 'ai_images'
  ) {
    const load = await this._credits.model.credits.groupBy({
      by: ['organizationId'],
      where: {
        organizationId,
        type,
        createdAt: {
          gte: from.toDate(),
        },
      },
      _sum: {
        credits: true,
      },
    });

    return load?.[0]?._sum?.credits || 0;
  }

  async useCredit<T>(
    org: Organization,
    type = 'ai_images',
    func: () => Promise<T>
  ) {
    const data = await this._credits.model.credits.create({
      data: {
        organizationId: org.id,
        credits: 1,
        type,
      },
    });

    try {
      return await func();
    } catch (err) {
      await this._credits.model.credits.delete({
        where: {
          id: data.id,
        },
      });
      throw err;
    }
  }

  setCustomerId(orgId: string, customerId: string) {
    return this._organization.model.organization.update({
      where: {
        id: orgId,
      },
      data: {
        paymentId: customerId,
      },
    });
  }
}
