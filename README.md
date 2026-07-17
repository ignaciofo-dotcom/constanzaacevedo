# Página Fisio Coty — constanzaacevedo.es

Sitio web de **Constanza Acevedo** — Fisioterapia pediátrica y respiratoria para bebés y
acupuntura para la salud de la mujer, en Barcelona. SEO-first, 100 % estático.

- **Stack:** [Astro 5](https://astro.build) (`output: 'static'`) · [Tailwind CSS 4](https://tailwindcss.com) · TypeScript estricto.
- **Idiomas:** ES (por defecto) + CA + EN con hreflang. **ES está completo; CA/EN se activan en M3** (ver más abajo).
- **Objetivo nº1:** generar tráfico. Diseño, código y contenido están al servicio de eso.

## Puesta en marcha

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # astro check + build estático a dist/
npm run preview    # sirve dist/ localmente
npm run format     # Prettier
```

Requiere Node 20+ (probado con Node 22).

## Estructura

```
src/
  config/         Fuente de verdad: NAP (site.ts), redes (social.ts), flags, formularios.
  content/        Content Collections (Markdown/JSON) — TODO el contenido vive aquí.
    services/     7 servicios, un fichero por idioma: <clave>.<lang>.md (serviceKey estable)
    guides/       Guías evergreen (SEO long-tail)
    faqs/         FAQ global por idioma (JSON)
    testimonials/ Reseñas reales (JSON) — [INPUT], jamás inventar
    locations/    Ubicaciones (JSON) — alimentan footer, contacto y schema LocalBusiness
  content.config.ts  Esquemas Zod de las colecciones
  i18n/           config (rutas/idiomas), ui.ts (strings), utils.ts
  lib/            urls.ts (WhatsApp, hreflang), schema.ts (JSON-LD), content.ts (queries)
  layouts/        BaseLayout.astro (<head>, meta, hreflang, OG, JSON-LD)
  components/     Header, Footer, BottomBar, ServiceCard, Faq, CtaWhatsApp, etc.
  pages/          Páginas ES en la raíz; CA en /ca, EN en /en (i18n de Astro)
  assets/og-fonts/  Fuentes vendorizadas para generar las OG images en build
public/           favicon, robots (generado), estáticos
```

Cómo añadir/editar contenido: toca los ficheros de `src/content/`, no los componentes.
Cada servicio tiene una **`serviceKey`** estable e independiente del idioma; en Fase 2 las
citas y la base de datos referenciarán esas claves, no los slugs.

## SEO incluido

- `title`/`description` únicos por página; sin meta keywords.
- JSON-LD por página (grafo): `Physiotherapy`/`MedicalBusiness`, `Person`, `WebSite`,
  `MedicalTherapy` (servicios), `FAQPage`, `BreadcrumbList`, `MedicalWebPage` (guías).
- hreflang recíproco + `x-default` (se emite automáticamente cuando hay >1 idioma activo).
- `sitemap-index.xml` + `robots.txt` generados en build.
- OG images 1200×630 generadas en build (`/og/*.png`) para servicios y guías.
- Presupuesto de rendimiento objetivo (móvil): LCP < 2,0 s · CLS < 0,1 · INP < 200 ms ·
  JS < 50 KB · Lighthouse ≥ 95.

## Trilingüe: activar CA y EN (M3)

El chrome (nav, footer, selector de idioma, hreflang) lee de `enabledLocales` en
`src/i18n/config.ts`. Mientras solo esté `['es']`, el sitio es monolingüe y no hay
enlaces ni hreflang rotos. Para activar CA/EN:

1. Crear los ficheros de contenido `*.ca.md` / `*.en.md` en `src/content/…`.
2. Crear las páginas en `src/pages/ca/…` y `src/pages/en/…` (usar las ES como plantilla).
3. Añadir `'ca'` y `'en'` a `enabledLocales`.

## Configurar antes de publicar (formularios, analítica, datos)

- **Formulario de contacto:** crea una *access key* gratuita en
  [web3forms.com](https://web3forms.com) y ponla en `PUBLIC_WEB3FORMS_KEY` (variable de
  entorno) o en `src/config/forms.ts`. El proveedor es intercambiable desde ese archivo.
- **Analítica** (`src/config/flags.ts`, `analyticsConsentBanner`): decidir entre GA4 +
  Consent Mode v2 con banner, o Plausible/Cloudflare Web Analytics sin banner.
- **Datos `[INPUT]`:** buscar el marcador `[INPUT]` en el repo — son los datos que faltan
  (número de WhatsApp definitivo, fotos, reseñas reales, NIF, tarifas, coordenadas, URLs
  de redes/GBP/Doctoralia). Están centralizados en `src/config/*` siempre que es posible.

```bash
grep -rn "\[INPUT" src   # lista todo lo pendiente
```

## Despliegue a Hostinger (preparado, desactivado)

El deploy final se conectará a **Hostinger** vía GitHub Actions. El workflow está en
`.github/workflows/deploy.yml.disabled` (renómbralo a `deploy.yml` para activarlo) y
requiere estos *secrets* en el repo:

- `HOSTINGER_FTP_HOST`, `HOSTINGER_FTP_USER`, `HOSTINGER_FTP_PASSWORD`, `HOSTINGER_FTP_DIR`.

Al tocar DNS en el despliegue, configurar **SPF/DKIM/DMARC** del dominio para que los
emails no caigan en spam (prerequisito de las integraciones de correo de Fase 2). Dar de
alta el sitio en **Google Search Console** y **Bing Webmaster** y enviar el sitemap.

## Phase 2 runway (no construir ahora; no bloquear después)

La Fase 1 deja las bases para: área personal de pacientes, **BD de pacientes** (datos de
salud = categoría especial RGPD → candidato Supabase región UE), **BD de ubicaciones**,
**sistema de citas** (candidato Cal.com; los tipos de cita mapearán a `serviceKey` y a
`locations`), **conexión Outlook/Gmail** (Microsoft Graph + Google APIs, requiere backend
y tokens), **Instagram** (bloque "Últimos posts" ya reservado tras el flag
`instagramFeed`), y voz→transcripción→recomendaciones.

Garantías ya en el código: contenido en colecciones tipadas y migrables; componentes y
tokens reutilizables; i18n por claves (reutilizable en emails/app); namespaces
`src/pages/app/` y `src/pages/api/` y subdominios `app.`/`api.` libres; formularios como
proveedor intercambiable (`src/config/forms.ts`); config centralizada en `src/config/`.

## Licencias de terceros

`src/assets/og-fonts/LiberationSans-*.ttf` — Liberation Fonts, licencia SIL Open Font
License, usadas solo para renderizar las imágenes OG en build.
