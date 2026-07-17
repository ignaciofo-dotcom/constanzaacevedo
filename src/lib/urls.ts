import { site } from '@config/site';
import {
  defaultLang,
  isLocaleEnabled,
  localeTag,
  routes,
  type Lang,
  type RouteKey,
} from '@i18n/config';
import { localePrefix } from '@i18n/utils';
import { withBase } from '@lib/base';

/** URL de WhatsApp con mensaje precargado (PLAN §6). */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(): string {
  return `tel:+${site.contact.phone.number}`;
}

export function emailUrl(subject?: string): string {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${site.contact.email}${q}`;
}

/** Ruta absoluta de un servicio a partir de su slug (sin prefijo) e idioma. */
export function serviceUrl(slug: string, lang: Lang): string {
  return withBase(`${localePrefix(lang)}/${slug}`);
}

/** Ruta de una guía. */
export function guideUrl(slug: string, lang: Lang): string {
  return `${routes.guides[lang]}/${slug}`;
}

/** Normaliza un pathname para comparar (sin trailing slash salvo raíz). */
export function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

export interface HreflangAlt {
  lang: Lang;
  hreflang: string;
  href: string; // ruta relativa (se resuelve contra site en el <head>)
}

/**
 * Cluster de alternates para una página conocida por RouteKey.
 * Solo idiomas habilitados (evita hreflang a páginas aún inexistentes). Con un
 * único idioma habilitado devuelve [] → el sitio es monolingüe y no emite hreflang.
 */
export function hreflangForRoute(key: RouteKey): HreflangAlt[] {
  const alts = (Object.keys(routes[key]) as Lang[])
    .filter(isLocaleEnabled)
    .map((lang) => ({ lang, hreflang: localeTag[lang], href: routes[key][lang] }));
  return alts.length > 1 ? alts : [];
}

/** Alternates a partir de un mapa lang→path explícito (servicios/guías). */
export function hreflangForPaths(map: Partial<Record<Lang, string>>): HreflangAlt[] {
  const alts = (Object.keys(map) as Lang[])
    .filter((lang) => isLocaleEnabled(lang) && Boolean(map[lang]))
    .map((lang) => ({ lang, hreflang: localeTag[lang], href: map[lang] as string }));
  return alts.length > 1 ? alts : [];
}

export { defaultLang };
