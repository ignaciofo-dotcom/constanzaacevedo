# 2026-07-17 · Chat 02 · Scaffold + sitio ES completo

> Nota: el PLAN §13 pedía `Página Coty/Work Logs/`; se usa `docs/work-logs/` por higiene
> del repositorio (sin espacios/acentos en rutas versionadas). Mismo propósito.

## Objetivo
Revisar el PLAN v1.1 y ejecutar M0→M2: scaffold, sistema de diseño y sitio ES completo,
dejando la infraestructura i18n lista para CA/EN (M3) y las bases de Fase 2.

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
