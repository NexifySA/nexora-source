# White-label notice — Nexpost by Nexify

Este código es una **adaptación white-label** del proyecto Postiz, operada por **Nexify** y comercializada bajo el nombre de producto **Nexpost**. El desarrollo se mantiene en un repositorio privado; el código fuente correspondiente al servicio público se publica en el mirror AGPL (ver más abajo).

## Origen

Está basado en el proyecto open source [Postiz](https://github.com/gitroomhq/postiz-app) de **Gitroom Ltd.**, distribuido bajo licencia **GNU AGPL-3.0**.

- Repo upstream: https://github.com/gitroomhq/postiz-app
- Licencia: AGPL-3.0 (archivo `LICENSE` en la raíz, **conservado intacto**).

## Qué se modificó

- **Branding visual:** logos, favicons, OG image, colores (ver `branding/nexify/BRAND_GUIDE.md`).
- **Texto visible al usuario:** todas las apariciones de "Postiz" y "Gitroom" en respuestas HTTP/HTML se reescriben a "Nexpost" via reverse-proxy (`sub_filter` de nginx) sin modificar la imagen de la app.
- **Infra:** stack Docker propio (`docker-compose.nexify.prod.yml`), nombres prefijados `nexify-postiz-*`, dominio `nexpost.com.ar`.

## Qué NO se modificó

- `LICENSE` (AGPL-3.0).
- Nombres internos de paquetes (`postiz-frontend`, `postiz-backend`, etc.) — preservados para no romper el sync con upstream.
- Endpoints `/api/...`, env vars `POSTIZ_*`, schema Prisma.
- Avisos de copyright en el código fuente.

## Obligaciones AGPL al ofrecer Nexpost como SaaS — RESUELTO

AGPL-3.0 §13 exige que cualquier usuario que interactúe con el software **a través de una red** pueda acceder al **código fuente correspondiente**.

**Solución implementada:** mirror público auto-sincronizado.

- **Repo de desarrollo:** privado, gestionado por Nexify
- **Repo de source code AGPL (público, read-only):** https://github.com/NexifySA/nexora-source
- En cada push a `main`, GitHub Actions empuja `main` al mirror público.
- El footer de https://nexpost.com.ar/ linkea al mirror y al texto AGPL.

Implementación completa documentada en [`docs/02-branding/AGPL_COMPLIANCE_PLAN.md`](./docs/02-branding/AGPL_COMPLIANCE_PLAN.md).

## Atribuciones

- Postiz © Gitroom Ltd. — AGPL-3.0
- Iconografía Nexpost — diseñada por Nexify (placeholders SVG, ver `branding/nexify/`)

## Contacto

Cualquier consulta legal o de cumplimiento AGPL: el responsable operativo del despliegue Nexpost.
