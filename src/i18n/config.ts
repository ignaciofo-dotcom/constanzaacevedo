/**
 * i18n core (PLAN §5). ES en raíz (sin prefijo), CA en /ca/, EN en /en/.
 * Slugs traducidos por página, hreflang recíproco + x-default → ES.
 */

export const languages = {
  es: 'Español',
  ca: 'Català',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

/**
 * Idiomas con contenido publicado. ES ya está completo; CA y EN se activan en
 * M3 (PLAN §11) añadiendo sus páginas y sumándolos aquí. Todo el chrome (nav,
 * hreflang, selector) lee de esta lista → no hay enlaces rotos mientras tanto.
 */
export const enabledLocales: Lang[] = ['es'];

export const isLocaleEnabled = (lang: Lang): boolean => enabledLocales.includes(lang);

/** BCP-47 para `lang`, `hreflang`, `og:locale`, `inLanguage`. */
export const localeTag: Record<Lang, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en',
};

export const ogLocale: Record<Lang, string> = {
  es: 'es_ES',
  ca: 'ca_ES',
  en: 'en_US',
};

/**
 * Mapa de rutas por clave de página estable e independiente del idioma.
 * La clave es lo que referencian el nav, breadcrumbs, hreflang y (en Fase 2)
 * las citas. Los slugs de servicio adicionales viven en la colección `services`.
 */
export const routes = {
  home: { es: '/', ca: '/ca/', en: '/en/' },
  about: { es: '/quien-soy', ca: '/ca/qui-soc', en: '/en/about' },
  services: { es: '/servicios', ca: '/ca/serveis', en: '/en/services' },
  book: { es: '/pedir-cita', ca: '/ca/demanar-cita', en: '/en/book' },
  contact: { es: '/contacto', ca: '/ca/contacte', en: '/en/contact' },
  faq: {
    es: '/preguntas-frecuentes',
    ca: '/ca/preguntes-frequents',
    en: '/en/faq',
  },
  guides: { es: '/guias', ca: '/ca/guies', en: '/en/guides' },
  privacy: {
    es: '/politica-privacidad',
    ca: '/ca/politica-privacitat',
    en: '/en/privacy-policy',
  },
  cookies: {
    es: '/politica-cookies',
    ca: '/ca/politica-cookies',
    en: '/en/cookie-policy',
  },
  legal: { es: '/aviso-legal', ca: '/ca/avis-legal', en: '/en/legal-notice' },
} as const;

export type RouteKey = keyof typeof routes;
