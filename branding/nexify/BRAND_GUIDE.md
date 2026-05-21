# BRAND GUIDE — Nexpost by Nexify

## Identidad

| Concepto | Valor |
|---|---|
| Compañía | **Nexify** |
| Producto | **Nexpost** |
| Firma / endorsement | **by Nexify** |
| Tagline opcional | *Social media management by Nexify* |
| Dominio productivo | `nexpost.com.ar` |
| URL canónica | `https://nexpost.com.ar` |

Ejemplos de uso:

- Logo principal: símbolo + "**Nexpost**" + "BY NEXIFY" en caps pequeñas debajo.
- Header de la app: "Nexpost".
- Footer: "© 2026 Nexify — Powered by Nexpost · Based on Postiz (AGPL-3.0)".
- OG / Twitter card title: "Nexpost by Nexify — Social media management".
- Email signatures: "Nexpost team — by Nexify".

## Tono

- **Profesional**, **simple**, **B2B SaaS**.
- Castellano neutro o inglés, según contexto.
- Evitar jerga, exclamaciones, emojis (salvo en estados puntuales de UI).
- Confianza > entusiasmo.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--nx-primary` | `#111827` | Fondos principales en modo dark, textos sobre claro |
| `--nx-accent` | `#2563EB` | Botones primarios, links, énfasis |
| `--nx-accent-soft` | `#0EA5E9` | Gradientes con accent (logo) |
| `--nx-bg` | `#F8FAFC` | Fondo modo claro |
| `--nx-text` | `#0F172A` | Texto principal modo claro |
| `--nx-text-muted` | `#64748B` | Texto secundario, "by Nexify" |
| `--nx-surface-dark` | `#0B1221` | Fondos overlays / hero dark |
| `--nx-border` | `#E2E8F0` | Bordes sutiles modo claro |

Gradiente del símbolo (logo):

```css
linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%);
```

Variante dark del logo: `#60A5FA → #22D3EE`.

## Tipografía

- Familia: **Inter** (la app ya carga *Plus Jakarta Sans* — ambas se ven bien; mantener PJS para no tocar bundle).
- Peso del wordmark "Nexpost": **700** (bold).
- Peso del endorsement "BY NEXIFY": **500**, letter-spacing aumentado, tamaño ~50% del wordmark.

## Reglas de uso

- **Sí:** "Nexpost", "Nexpost by Nexify".
- **Sí en footer/legal:** "Based on Postiz (AGPL-3.0). Source: github.com/gitroomhq/postiz-app".
- **No:** sustituir o esconder avisos de licencia AGPL.
- **No:** renombrar paquetes internos del monorepo (`postiz-frontend`, etc.).
- **No:** renombrar endpoints (`/api/...`) ni env vars (`POSTIZ_*`).
- **OK:** OAuth display via env: `NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME=Nexpost` y logo URL apuntando a `/logo.svg`.

## Assets en este directorio

| Archivo | Uso |
|---|---|
| `logo.svg` | Símbolo solo (40x40) |
| `logo-text.svg` | Símbolo + "Nexpost" + "BY NEXIFY" — versión clara |
| `logo-text-dark.svg` | Misma sobre fondo oscuro |
| `favicon.svg` | Favicon vector (browsers modernos) |
| `favicon.ico` | Favicon legacy (placeholder = original Postiz hasta render PNG real) |
| `favicon.png` | Favicon raster (placeholder) |
| `postiz.svg` | Override del logo interno de la app (mismo símbolo Nexpost) |
| `postiz-text.svg` | Override del wordmark interno (Nexpost by Nexify) |
| `og-image.svg` | Card para OpenGraph / Twitter (1200x630) |

## Cómo se aplican

1. **Bind-mount** desde `branding/nexify/*` sobre `/app/apps/frontend/public/*` en el container `nexify-postiz-app` (ver `docker-compose.nexify.prod.yml`). Tomado en cada `up -d`.
2. **Nginx `sub_filter`** en `agentsaas-nginx-1` reescribe los strings literales "Postiz" → "Nexpost" en respuestas HTML/JS. Esto cubre todos los `<title>Postiz - X</title>` y similares sin tocar la imagen.

## Pendientes para producción "perfecta"

- Renderizar `favicon.svg` → `favicon.ico` (multi-size 16/32/48) y `favicon.png` (32x32, 192x192, 512x512). Cualquier herramienta sirve: https://realfavicongenerator.net/
- Renderizar `og-image.svg` → `og-image.png` (1200x630). Por ejemplo con `inkscape -w 1200 og-image.svg --export-filename=og-image.png` o usando squoosh.app.
- Reemplazar logos PNG si querés look más pulido (los SVG actuales son geométricos — placeholder profesional, no logo final de marca).

## Originales preservados

Los assets originales de Postiz se conservan en `branding/original-postiz-assets/` para rollback.
