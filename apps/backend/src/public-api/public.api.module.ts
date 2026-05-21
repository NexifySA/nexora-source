import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '@gitroom/backend/services/auth/auth.service';
import { StripeService } from '@gitroom/nestjs-libraries/services/stripe.service';
import { PoliciesGuard } from '@gitroom/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@gitroom/backend/services/auth/permissions/permissions.service';
import { IntegrationManager } from '@gitroom/nestjs-libraries/integrations/integration.manager';
import { UploadModule } from '@gitroom/nestjs-libraries/upload/upload.module';
import { OpenaiService } from '@gitroom/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@gitroom/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@gitroom/nestjs-libraries/services/codes.service';
import { PublicIntegrationsController } from '@gitroom/backend/public-api/routes/v1/public.integrations.controller';
import { PublicAuthMiddleware } from '@gitroom/backend/services/auth/public.auth.middleware';
import { BillingAccessGuard } from '@gitroom/nestjs-libraries/billing/billing.access.guard';
import { APP_GUARD } from '@nestjs/core';

const authenticatedController = [PublicIntegrationsController];
@Module({
  imports: [UploadModule],
  controllers: [...authenticatedController],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
    BillingAccessGuard,
    { provide: APP_GUARD, useClass: BillingAccessGuard },
  ],
  get exports() {
    // APP_GUARD es un binding global, no se puede re-exportar.
    return [
      ...this.imports,
      ...this.providers.filter(
        (p: any) => !(p && p.provide === APP_GUARD)
      ),
    ];
  },
})
export class PublicApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicAuthMiddleware).forRoutes(...authenticatedController);
  }
}

