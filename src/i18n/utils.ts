import { defaultLang, languages, routes, type Lang, type RouteKey } from './config';
import { ui } from './ui';

/** Deduce el idioma a partir del pathname de la URL. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'ca' || seg === 'en') return seg;
  return defaultLang;
}

/** Traductor de strings de UI con fallback a ES. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Ruta de una página conocida en el idioma dado. */
export function localizedRoute(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Prefijo de idioma para construir rutas de servicios/guías desde una colección. */
export function localePrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

/** Lista de idiomas para el selector, marcando el activo. */
export function otherLanguages(current: Lang) {
  return (Object.keys(languages) as Lang[]).map((code) => ({
    code,
    label: languages[code],
    active: code === current,
  }));
}
