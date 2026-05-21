-- Nexpost — agregar tracking creation method en Post + soporte CLI.
-- Aplicar manualmente en produccion ANTES de promover el codigo:
--   docker exec nexify-postiz-app sh -c "cd /app && npx prisma migrate deploy --schema libraries/nestjs-libraries/src/database/prisma/schema.prisma"
-- Alternativa idempotente para Postiz upstream (que usa db push):
--   docker exec nexify-postiz-app sh -c "cd /app && npx prisma db push --schema libraries/nestjs-libraries/src/database/prisma/schema.prisma"
--
-- Esta migracion agrega:
--   1. Enum CreationMethod (UNKNOWN, WEB, MCP, API, AUTOPOST, CLI)
--   2. Columna Post.creationMethod con default UNKNOWN
--   3. Index en Post(creationMethod)
--
-- Es safe contra posts existentes: ALTER TABLE ADD COLUMN con DEFAULT
-- constante en Postgres >= 11 es metadata-only (no reescribe la tabla).
-- Todos los posts existentes quedan con creationMethod = UNKNOWN.

-- 1. Crear enum (idempotente)
DO $$ BEGIN
    CREATE TYPE "CreationMethod" AS ENUM ('UNKNOWN', 'WEB', 'MCP', 'API', 'AUTOPOST', 'CLI');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Agregar columna (idempotente)
ALTER TABLE "Post"
  ADD COLUMN IF NOT EXISTS "creationMethod" "CreationMethod" NOT NULL DEFAULT 'UNKNOWN';

-- 3. Crear index (idempotente)
CREATE INDEX IF NOT EXISTS "Post_creationMethod_idx" ON "Post"("creationMethod");
