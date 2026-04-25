# Branding — Nexpost by Nexify

> Marca actualizada. Producto: **Nexpost**. Compañía: **Nexify**.
> Para guía completa ver `BRAND_GUIDE.md` en este mismo directorio.

---

## (sección legacy — se mantiene como referencia técnica)

Carpeta donde viven los assets de marca `Nexify Social`.

## Archivos esperados

| Archivo | Uso | Dimensiones recomendadas |
|---|---|---|
| `logo.svg` | Logo principal (header, login) | 200x40 aprox. |
| `logo-text.svg` | Logo con texto | 200x40 |
| `favicon.ico` | Favicon multi-tamaño | 16/32/48 px |
| `favicon.png` | Favicon PNG fallback | 32x32 o 64x64 |
| `fav-512.png` | PWA / redes sociales | 512x512 |

Actualmente hay **placeholders** generados. Reemplazarlos por los assets reales antes de producción.

## Cómo se aplican en runtime

El compose productivo (`docker-compose.nexify.prod.yml`) monta estos archivos **sobrescribiendo** los de Postiz dentro del contenedor:

```yaml
volumes:
  - ./branding/nexify/favicon.ico:/app/apps/frontend/public/favicon.ico:ro
  - ./branding/nexify/favicon.png:/app/apps/frontend/public/favicon.png:ro
  - ./branding/nexify/logo.svg:/app/apps/frontend/public/logo.svg:ro
  - ./branding/nexify/logo-text.svg:/app/apps/frontend/public/logo-text.svg:ro
```

## Cómo reemplazar

1. Copiar el asset real de Nexify encima del placeholder manteniendo el mismo nombre.
2. Reiniciar la app: `bash deploy/scripts/04_restart.sh`.
3. Hard refresh en el navegador (Ctrl+Shift+R) para bustear el caché.

## Limitaciones

Como se usa la imagen pre-construida `ghcr.io/gitroomhq/postiz-app:latest`, los textos internos de la UI (ej. títulos `Postiz - Analytics`) siguen apareciendo como "Postiz" / "Gitroom". Para cambiarlos hay que buildear desde fuente — ver `AUDIT_NEXIFY_POSTIZ.md` sección "Nivel 2".
