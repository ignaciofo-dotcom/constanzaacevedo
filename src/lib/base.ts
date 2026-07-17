/**
 * Base-path awareness para poder servir el sitio bajo un subdirectorio
 * (p. ej. GitHub Pages: /constanzaacevedo/). En producción real (Hostinger,
 * dominio propio) `BASE_URL` es '/' y `withBase` es la identidad.
 *
 * Sin dependencias → puede importarse desde i18n/config y lib/urls sin ciclos.
 */
const BASE = import.meta.env.BASE_URL; // '/', o '/constanzaacevedo/'

/** ¿Estamos en un despliegue de preview bajo subdirectorio? (para noindex). */
export const isPreview = BASE !== '/';

/** Prefija una ruta interna con el base path. Deja intactas las URLs externas. */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || /^(mailto:|tel:|#)/.test(path)) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE; // '' o '/constanzaacevedo'
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
