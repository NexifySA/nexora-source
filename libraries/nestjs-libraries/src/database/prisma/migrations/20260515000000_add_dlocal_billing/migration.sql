-- Nexpost — agregar campos billing genericos a Subscription + tabla BillingEvent.
-- Aplicar manualmente en produccion antes de promover el codigo:
--   docker exec nexify-postiz-app sh -c "cd /app && npx prisma migrate deploy"
-- Alternativa idempotente para Postiz upstream (que usa db push):
--   docker exec nexify-postiz-app sh -c "cd /app && npx prisma db push"
--
-- Esta migracion solo agrega columnas nullable + una tabla nueva, NO toca
-- datos existentes. Es safe contra usuarios y suscripciones actuales.

ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "billingProvider" TEXT;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "billingCustomerId" TEXT;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "billingSubscriptionId" TEXT;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "planStatus" TEXT;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "trialEndsAt" TIMESTAMP(3);
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "currentPeriodStart" TIMESTAMP(3);
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "currentPeriodEnd" TIMESTAMP(3);
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "lastPaymentStatus" TEXT;
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "lastPaymentId" TEXT;

CREATE INDEX IF NOT EXISTS "Subscription_billingProvider_billingSubscriptionId_idx"
  ON "Subscription"("billingProvider", "billingSubscriptionId");

CREATE TABLE IF NOT EXISTS "BillingEvent" (
  "id"                TEXT NOT NULL,
  "provider"          TEXT NOT NULL,
  "externalEventId"   TEXT NOT NULL,
  "externalPaymentId" TEXT,
  "eventType"         TEXT NOT NULL,
  "payload"           TEXT NOT NULL,
  "processedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BillingEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "BillingEvent_provider_externalEventId_key"
  ON "BillingEvent"("provider", "externalEventId");

CREATE INDEX IF NOT EXISTS "BillingEvent_provider_externalPaymentId_idx"
  ON "BillingEvent"("provider", "externalPaymentId");
