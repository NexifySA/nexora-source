# CLAUDE.md — Nexpost (white-label de Postiz)

Este repo es **Nexpost by Nexify**, una adaptación white-label del proyecto open source **Postiz** (Gitroom Ltd., AGPL-3.0). El upstream sigue siendo `gitroomhq/postiz-app`. Mantenemos compatibilidad de paquetes y schemas para poder hacer sync periódico.

**Atribución mínima vive en `WHITE_LABEL_NOTICE.md`. Detalles legales/societarios y la estrategia de cumplimiento AGPL no están cerrados — no asumirlos como decididos.**

---

## 1. Producto

Postiz/Nexpost es un scheduler multi-canal: programa posts en 28+ redes (X, LinkedIn, Instagram, Facebook, YouTube, TikTok, Threads, Reddit, Mastodon, Discord, Slack, Pinterest, GMB, etc.). Calendario, analytics, teams, media library, editor de imágenes (Polotno), AI text/img/video.

## 2. Stack y estructura

Monorepo PNPM. **Sólo pnpm**, nunca npm/yarn.

- `apps/backend/` — API REST (NestJS)
- `apps/frontend/` — UI (Next.js App Router, React, Tailwind 3)
- `apps/orchestrator/` — workflows en Temporal
- `libraries/nestjs-libraries/` — servicios compartidos backend/orchestrator (integraciones sociales, AI, OpenAI, video, third-parties)
- `libraries/helpers/` — utilidades cross-app (incluye `useFetch` hook)
- `libraries/react-shared-libraries/` — i18n, componentes compartidos
- `branding/nexify/` — assets white-label
- `docs/` — toda la documentación operativa
- `.github/workflows/` — CI: build de imagen, eventual mirror público (revisar estado real antes de asumir)

## 3. Backend rules

Capas obligatorias (sin atajos):
```
Controller → Service → Repository
Controller → Manager → Service → Repository  (cuando hay manager)
```

Lógica de servidor pertenece a `libraries/nestjs-libraries/`. El backend repo casi sólo tiene controllers + imports.

## 4. Frontend rules

- Routing en `apps/frontend/src/app/` (App Router con route groups: `(app)`, `(marketing)`, `(extension)`, `(provider)`)
- Componentes en `apps/frontend/src/components/`, UI primitives en `apps/frontend/src/components/ui/`
- **Siempre SWR** para fetch + hook `useFetch` de `libraries/helpers/src/utils/custom.fetch.tsx`
- Cada hook SWR en su función separada (cumple `react-hooks/rules-of-hooks`). **Nunca** `eslint-disable-next-line` para esto
- Tailwind 3 — antes de inventar estilos revisar `apps/frontend/src/app/colors.scss`, `global.scss`, `tailwind.config.js`
- `--color-custom*` están **deprecados**, no usarlos
- **Nunca** instalar componentes de UI desde npm — escribir nativos
- Lint corre sólo desde la raíz: `pnpm lint`

## 5. Branding (Nexpost)

Datos confirmados:
- Producto = **Nexpost**
- Marca paraguas / firma = **by Nexify**
- Dominio principal = `https://nexpost.com.ar`

Datos **no confirmados** (no asumir):
- Razón social, CUIT, condición fiscal, dirección legal
- Email de contacto societario
- Estrategia AGPL definitiva (mirror público, source-availability flow)

Reglas:
- Cualquier texto **visible al user** en el UI/copy/metadata **debe decir Nexpost** (o "by Nexify" donde corresponda firma) y nunca Postiz/Gitroom.
- Nombres internos de paquetes (`postiz-frontend`, `postiz-backend`, etc.), env vars (`POSTIZ_*`), endpoints `/api/...` y schema Prisma **NO se renombran** — preservan compatibilidad con upstream.
- Avisos de copyright en código fuente preservados (no tocar).
- Si aparece la necesidad de exhibir datos legales en el UI (Terms, Privacy, footer), **pasar el contenido a `security-compliance` antes de hardcodearlo**.

## 6. Reglas legales / AGPL

Postiz upstream es AGPL-3.0. Esto implica obligaciones cuando se sirve por red, pero la **forma exacta de cumplir** (mirror público, source-availability link, otra opción) **no está cerrada en este proyecto**. No asumir como hecho consumado:
- Ningún mirror público específico
- Ningún workflow `mirror-source-public.yml` activo (verificar en `.github/workflows/` antes de asumir)
- Ninguna URL externa de "Source code" en el footer

Reglas que **sí** son hard:
- `LICENSE` **intacto**, nunca eliminar ni modificar
- `WHITE_LABEL_NOTICE.md` presente con atribución a Postiz/Gitroom
- Avisos de copyright en código fuente preservados
- No afirmar que Nexpost es "producto oficial Postiz" ni usar marca Gitroom como propia

Cuando haya que tomar una decisión AGPL → pasarla por `security-compliance` y documentar en `docs/02-branding/` o `docs/03-security/` después de que el usuario la apruebe explícitamente.

## 7. Reglas de deploy

Datos canónicos confirmados:
- Producción: droplet DigitalOcean `45.55.55.148` (`ssh -i ~/.ssh/botwhat root@45.55.55.148`, user real es `root`)
- Dominio prod: `nexpost.com.ar` (Cloudflare → nginx en `agentsaas-nginx-1` → `nexify-postiz-app:5000`)
- Stack: `/var/www/nexify-postiz/docker-compose.nexify.prod.yml` + `.env.nexify.production`
- Imagen: `ghcr.io/luisrepi/nexify-postiz:latest` (privada, GHCR)
- CI: `.github/workflows/build-nexpost-image.yml` build automático en push a `main`

Reglas duras:
- **Nunca** desplegar sin que el CI esté en verde
- **Nunca** modificar containers del stack `agentsaas-*` o `nexfile-*` — son apps ajenas que comparten droplet (Nexflow + agentsaas)
- Después de un `force-recreate` puede ser necesario `docker exec agentsaas-nginx-1 nginx -s reload` (DNS cache)
- Validar siempre que backend levante: `pm2 list | grep backend.*online` + `docker logs --tail 30` con "Backend started successfully". Si quedó en silent hang, `pm2 restart backend`.
- **Nunca** correr `docker system prune` ni borrar volúmenes en este droplet
- **Nunca** tocar bases de datos / regenerar `.env` automáticamente

## 8. Reglas de operación

- **No tocar producción sin validación previa** — leer logs, confirmar SHA de imagen, tener plan de rollback antes de `up -d`.
- Rollback: `docker tag <sha-anterior> ghcr.io/luisrepi/nexify-postiz:latest && docker compose ... up -d --force-recreate`.
- **No skipear hooks** (`--no-verify`) ni firmas (`--no-gpg-sign`) salvo pedido explícito.
- **No** `git push --force` a main.
- **No** rotar/regenerar secrets sin avisar al humano cómo actualizar el droplet.

## 9. Documentación

**Convención obligatoria:**
- **Nada de `.md` sueltos en raíz**, salvo `README.md`, `LICENSE`, `WHITE_LABEL_NOTICE.md`, `CLAUDE.md`, `AGENTS.md`.
- Toda documentación nueva va en `docs/<categoria>/` con la categoría correspondiente:
  - `00-status/` — snapshots de estado de prod
  - `01-deploy/` — deploy, builds, CI, SSL
  - `02-branding/` — branding y compliance AGPL
  - `03-security/` — security, OAuth, SMTP
  - `04-ops/` — runbooks ops
  - `05-upstream/` — sync con upstream Postiz, agentes
  - `99-archive/` — legacy
- Cuando creás un doc nuevo, **actualizá `docs/README.md`** agregando la entrada al índice.
- Si encontrás un `.md` perdido en raíz que no es de los permitidos, moverlo a la categoría correcta.

## 10. Convención de commits

Tipo Conventional Commits:
- `feat(<scope>):` nueva feature
- `fix(<scope>):` bugfix
- `ui(<scope>):` cambios visuales/labels
- `docs(<scope>):` documentación
- `chore(<scope>):` infra/config
- `ci(<scope>):` workflows CI
- `debug(<scope>):` instrumentación temporal de logs

**Ejemplos reales del repo:**
```
fix(linkedin): drop legacy r_basicprofile, request email instead
ui(instagram): rename providers to "Instagram Personas" / "Instagram Empresas"
ci(mirror): re-enable auto-sync on push
```

Co-author de Claude obligatorio en commits asistidos:
```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

## 11. Validación pre-deploy (checklist mínimo)

Antes de hacer `up -d` en producción:
1. CI build verde para el commit que se va a desplegar
2. Diff visual mínimo: `git log --stat <ultima-imagen>..HEAD` para saber qué entra
3. Imagen pulleada: `docker pull` muestra "Downloaded newer image"
4. Backup mental del SHA actual por si hay rollback (`docker inspect nexify-postiz-app --format '{{.Image}}'`)
5. Después del up: `docker exec nexify-postiz-app pm2 list` con backend online
6. Después del up: `curl -s -o /dev/null -w '%{http_code}' https://nexpost.com.ar/api/integrations/list` → 401 (auth) o 200, **nunca 502/503**
7. Reload nginx si dió 502: `docker exec agentsaas-nginx-1 nginx -s reload`

---

## 12. Arquitectura de agentes (subagents Claude Code)

Este repo tiene una arquitectura de agentes especializados en `.claude/agents/`. Si una tarea es grande o cruza áreas, **invocar al orchestrator** primero. Para tareas focalizadas, llamar al agente especialista directo.

| Agente | Cuándo invocarlo |
|---|---|
| `orchestrator` | Tareas multi-área, planning, decidir flujo |
| `branding` | Naming, copy, landing, metadata, pricing visible |
| `frontend-app` | Rutas, componentes, layouts, UX |
| `devops-deploy` | Docker, CI, droplet, nginx, healthchecks |
| `security-compliance` | AGPL, secrets, OAuth, SMTP, legales |
| `docs-ops` | Ordenar docs, índice, runbooks, mover archivos |
| `qa-audit` | Pre-deploy review, branding leaks, riesgos |

Detalle completo en `docs/05-upstream/AGENT_OPERATING_MODEL_NEXPOST.md`.
Prompts listos para copiar en `docs/05-upstream/AGENT_PROMPT_TEMPLATES_NEXPOST.md`.
Baseline de contexto y supuestos en `docs/05-upstream/AGENT_CONTEXT_BASELINE_NEXPOST.md`.

**Política de handoff:**
- DevOps **no** cambia textos de branding.
- Branding **no** toca compose ni nginx.
- Security **revisa antes** de cualquier decisión AGPL/secrets.
- QA **revisa antes** de cada deploy.
- Orchestrator **decide** cuándo derivar y a quién.
