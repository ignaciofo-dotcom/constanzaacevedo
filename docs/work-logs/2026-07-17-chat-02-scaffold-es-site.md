# 2026-07-17/18 · Chat 02 · Scaffold ES + despliegue preview (GitHub Pages)

> Nota: el PLAN §13 pedía `Página Coty/Work Logs/`; se usa `docs/work-logs/` por higiene
> del repositorio (sin espacios/acentos en rutas versionadas). Mismo propósito.

## Objetivo
Revisar el PLAN v1.1 y ejecutar M0→M2: scaffold, sistema de diseño y sitio ES completo,
dejando la infraestructura i18n lista para CA/EN (M3) y las bases de Fase 2. Después, a
petición del owner: subir todo a GitHub y publicar un **preview navegable** desde GitHub.

## Cronología (qué se pidió y cuándo)
1. «Revisa el plan y ajústalo; necesito crear esta web.» → revisión + build M0–M2 (ES).
2. «Conéctate al repo constanzaacevedo.» → repo añadido a la sesión y clonado (estaba vacío).
3. «Sube el código al repo y dame el enlace para ver la web y probarla desde GitHub.»
   → push + montaje de despliegue en GitHub Pages.
4. «Me da este error (404 en la raíz github.io). ¿Puedes hacerlo con GitHub Actions?»
   → despliegue por rama `gh-pages` (auto-habilita Pages sin tocar ajustes). **Live.**
5. «¿Dejaste un log de todo?» → este documento actualizado.

## Decisiones / ajustes al plan
1. **Repositorio único `constanzaacevedo`** (vacío) en lugar de crear `pagina-fisio-coty`.
   Coincide con el dominio y simplifica el deploy. `package.json` conserva el nombre visible.
2. **Tailwind v4 sin `tailwind.config.js`**: tokens de diseño en CSS con `@theme`
   (`src/styles/global.css`), vía `@tailwindcss/vite`. Misma intención que el §9.
3. **ES primero, CA/EN después** (objetivo nº1 = tráfico). Añadido `enabledLocales` en
   `src/i18n/config.ts`: con un solo idioma, el sitio es monolingüe y NO hay hreflang ni
   enlaces rotos. M3 = crear páginas CA/EN + añadir los códigos a esa lista.
4. **Guías**: se han redactado las 2 de mayor volumen estacional (bronquiolitis,
   plagiocefalia). Las otras 5 quedan listadas como pendientes en `/guias`.
5. **OG images**: `astro-og-canvas` en build. La fuente por red estaba bloqueada, así que
   se **vendoriza Liberation Sans** (OFL) en `src/assets/og-fonts/` → build self-contained.
6. **Formularios**: Web3Forms como proveedor intercambiable (`src/config/forms.ts`).
7. **Base path centralizado** (`src/lib/base.ts` + `rawRoutes`/`routes` en
   `src/i18n/config.ts`): permite servir bajo subdirectorio (GitHub Pages
   `/constanzaacevedo/`) sin romper nav ni assets. Identidad cuando `BASE_URL==='/'`
   (Hostinger/dominio propio). El preview bajo subdirectorio se auto-marca `noindex`.
8. **Despliegue por rama `gh-pages`** en vez de la acción oficial `deploy-pages`: el token
   de integración no puede *habilitar* Pages por API (error «Resource not accessible by
   integration»); publicar en `gh-pages` hace que GitHub **auto-habilite** Pages.

## Hecho
- M0: Astro 5 + Tailwind 4 + TS estricto, i18n routing, aliases, CI, README.
- M1: tokens/paleta, tipografías self-hosted, componentes (Header, Footer, BottomBar móvil
  con [WhatsApp][Llamar][Pedir cita], ServiceCard, Faq, CtaWhatsApp, Breadcrumbs,
  MetricStrip, TestimonialCard, LanguagePicker, Icon, ContactForm).
- M2: home, quién soy, hub servicios, 7 detalles de servicio, pedir cita, contacto,
  preguntas frecuentes, guías (índice + 2), 3 legales, 404. Colecciones pobladas en ES.
- SEO: JSON-LD (Physiotherapy+Person+WebSite+Service+FAQPage+Breadcrumb+MedicalWebPage),
  metas únicas, sitemap + robots, OG images, compatibilidad de anclas antiguas.
- Verificado: `npm run build` verde (20 páginas), `astro check` 0 errores, render y JSON-LD
  comprobados en preview, capturas desktop + móvil OK.

## Despliegue (preview en GitHub Pages) — LIVE
- **URL:** https://ignaciofo-dotcom.github.io/constanzaacevedo/ (usar la ruta
  `/constanzaacevedo/`; la raíz `ignaciofo-dotcom.github.io` da 404 y es lo esperado).
- Método: build con `BASE_PATH=/constanzaacevedo` + `SITE_URL=https://ignaciofo-dotcom.github.io`,
  `dist/.nojekyll`, y publicación en la rama `gh-pages`.
- Workflow: `.github/workflows/pages.yml` (peaceiris/actions-gh-pages, `force_orphan`).
  Cada push a la rama de trabajo reconstruye y redepliega automáticamente.
- Intento previo fallido: `.github/workflows/pages.yml` con `actions/deploy-pages` +
  `configure-pages@v5 (enablement:true)` → falló al *crear* el sitio Pages (permisos del
  token de integración). Sustituido por el método de rama.
- Confirmación: el run interno «pages build and deployment» (rama `gh-pages`) terminó en
  `success`. (Desde el sandbox no se puede abrir `github.io` — el proxy deniega el CONNECT
  con 403 —, por eso la verificación externa se apoya en el estado de GitHub, no en curl.)
- Verificación local equivalente hecha antes del push: preview servido bajo
  `/constanzaacevedo/` con todas las páginas en 200 y click-through de navegación sin 4xx.

## Ramas y commits (repo ignaciofo-dotcom/constanzaacevedo)
- `claude/connect-constanzaacevedo-repo-usunr7` (rama de trabajo):
  1. `Build SEO-first Astro site for Constanza Acevedo (ES complete)`
  2. `Add base-path support and GitHub Pages preview deploy`
  3. `Switch Pages deploy to gh-pages branch method`
- `gh-pages`: salida `dist/` publicada (la sirve GitHub Pages). No editar a mano.
- Lanzamiento final: `.github/workflows/deploy.yml.disabled` (Hostinger, base `/`).

## Pendiente (siguiente chat)
- M3: traducciones CA (barceloní) + EN y sus páginas; activar `enabledLocales`.
- Guías 3–7 (§6.9). Textos legales en CA/EN. Tabla de hitos motores como guía dedicada.
- Banner de consentimiento + analítica (decisión §7.7). Mapa con facade real en /contacto.
- QA final M5: Lighthouse ≥95 en dispositivo, axe, test 360px, revisión ortográfica.

## Inputs que faltan (★ = bloqueante de publicación)
- ★ Número único de WhatsApp (647 137 693 vs 663 013 050) → `src/config/site.ts`.
- ★ URLs reales de Instagram/TikTok + enlace GBP + ¿Doctoralia? → `src/config/social.ts`.
- ★ Fotos profesionales (Coty, consulta) → sustituir placeholders `[INPUT]`.
- Reseñas reales (texto + inicial + permiso) → `src/content/testimonials/es.json`.
- Cifra de horas clínicas y nº de familias → `src/config/site.ts`.
- ¿Publicar tarifas? y tarifas por servicio/taller → FAQ + flag `showPricing`.
- NIF del titular (autónoma/sociedad) → `src/config/site.ts` (aviso legal).
- Coordenadas exactas / enlace Maps del centro → `src/config/site.ts` + locations.
- Zonas de domicilio, duración de sesión, política de cancelación, seguros, fechas de taller.

Lista viva: `grep -rn "\[INPUT" src`.
