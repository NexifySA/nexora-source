-- Nexpost: agregar el valor 'FREE' al enum SubscriptionTier.
--
-- Necesario para el trial interno de 14 dias (dLocal Go MVP): seedTrial
-- crea una fila Subscription con subscriptionTier='FREE'. Upstream Postiz
-- nunca tuvo FREE en el enum (los usuarios free no tenian Subscription).
--
-- ALTER TYPE ... ADD VALUE es idempotente con IF NOT EXISTS (PG 12+) y
-- seguro dentro de la transaccion de la migracion porque el valor nuevo
-- NO se usa en esta misma migracion (solo se agrega).
--
-- Aplicar en prod con:
--   docker exec nexify-postiz-app sh -c \
--     "cd /app && npx prisma migrate deploy --schema libraries/nestjs-libraries/src/database/prisma/schema.prisma"
-- NO usar db push.

ALTER TYPE "SubscriptionTier" ADD VALUE IF NOT EXISTS 'FREE';
