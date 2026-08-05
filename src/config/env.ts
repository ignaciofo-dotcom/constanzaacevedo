/**
 * Entorno de ejecución del build (Producción / Desarrollo).
 *
 * Lo fija el workflow de despliegue mediante variables de entorno:
 *   PUBLIC_APP_ENV       'production' | 'development'   (por defecto: development)
 *   PUBLIC_ALLOW_INDEXING'true'                          (por defecto: false)
 *
 * Regla de indexación (importante para SEO): **por defecto NO se indexa**.
 * Solo el despliegue final en el dominio real (Hostinger) pone
 * PUBLIC_ALLOW_INDEXING=true. Así ni el entorno de desarrollo ni la preview de
 * GitHub Pages compiten en Google con constanzaacevedo.es (contenido duplicado).
 */

export type AppEnv = 'production' | 'development';

const rawEnv = import.meta.env.PUBLIC_APP_ENV;

export const appEnv: AppEnv = rawEnv === 'production' ? 'production' : 'development';

export const isProduction = appEnv === 'production';
export const isDevelopment = !isProduction;

/** Solo true en el despliegue del dominio real. Seguro por defecto. */
export const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

/** Etiqueta corta para banners y depuración. */
export const envLabel = isProduction ? 'Producción' : 'Desarrollo';
