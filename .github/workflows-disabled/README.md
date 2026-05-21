# `.github/workflows-disabled/`

Workflows heredados de upstream Postiz que **no aplican** a Nexpost.

GitHub Actions solo escanea `.github/workflows/`. Mover los archivos acá los
desactiva sin borrarlos — quedan disponibles como referencia o para reactivar
si algún día se necesitan.

## Activos en Nexpost (en `.github/workflows/`)

| Workflow | Trigger | Propósito |
|---|---|---|
| `build-nexpost-image.yml` | push main, dispatch | Builda y publica `ghcr.io/luisrepi/nexify-postiz:latest` + `:<sha>` + `:<custom-tag>` |
| `deploy-nexpost.yml` | workflow_run (Build Nexpost image), dispatch | SSH al droplet, pull + recreate `nexify-postiz-app`, smoke tests |
| `mirror-source-public.yml` | push main, dispatch | Snapshot del repo privado → `NexifySA/nexora-source` (AGPL §13 compliance). Requiere secret `MIRROR_PAT`. |
| `pr-quality.yml` | pull_request_target | Anti-slop check (PRs spam) |

## Movidos a `.github/workflows-disabled/`

| Archivo | Por qué se deshabilitó |
|---|---|
| `build.yml` | Upstream Postiz manual build. `build-nexpost-image.yml` ya cubre nuestro build + publica imagen propia. |
| `build-containers.yml` | Pushea a `ghcr.io/gitroomhq/postiz-app` (registry upstream sin permisos para nosotros). Reemplazado por `build-nexpost-image.yml`. |
| `pr-docker-build.yml` | Buildea imagen de PR a `ghcr.io/gitroomhq/postiz-app-pr` → 403 permission_denied en cada PR del fork. |
| `build-extension.yaml` | Build Chrome extension hardcoded a `FRONTEND_URL=https://platform.postiz.com`. No aplica a Nexpost. |
| `publish-extension.yml` | Publica al Chrome Web Store de Postiz. No aplica. |
| `stale.yml` | `if: github.repository == 'gitroomhq/postiz-app'` → siempre skip en nuestro fork, pero cron `*/30 * * * *` consume CI quota inútilmente. |
| `issue-label-triggers.yml` | Mensajes hardcodeados a "Nevo David" / sitio público Postiz. No aplica. |
| `eslint` | Archivo sin extensión (`eslint`, no `eslint.yml`). GitHub solo ejecuta `*.yml`/`*.yaml` → nunca corrió. Movido por limpieza. |
| `codeql.yml` | CodeQL security analysis: el análisis corre OK pero el **upload de SARIF falla** porque Code Scanning **no está habilitado** en este repo (Settings → Security → Code security and analysis → Enable Code Scanning). Deshabilitado temporalmente para no ensuciar PRs con un check rojo recuperable. **Reactivar** cuando se habilite Code Scanning: `git mv .github/workflows-disabled/codeql.yml .github/workflows/codeql.yml`. |

## Cómo reactivar uno

```bash
git mv .github/workflows-disabled/<archivo> .github/workflows/<archivo>
git commit -m "ci: reactivate <archivo>"
```
