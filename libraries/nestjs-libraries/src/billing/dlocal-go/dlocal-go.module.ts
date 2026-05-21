import { Module } from '@nestjs/common';
import { DlocalGoService } from '@gitroom/nestjs-libraries/billing/dlocal-go/dlocal-go.service';
import { BillingProviderFactory } from '@gitroom/nestjs-libraries/billing/billing.provider.factory';
import { PrismaService } from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import { SubscriptionService } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.service';

@Module({
  imports: [],
  providers: [
    DlocalGoService,
    BillingProviderFactory,
    PrismaService,
    SubscriptionService,
  ],
  exports: [DlocalGoService, BillingProviderFactory],
})
export class DlocalGoModule {}
