import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@i18n/config';

/** Servicios de un idioma, sin borradores, ordenados. */
export async function getServices(lang: Lang): Promise<CollectionEntry<'services'>[]> {
  const all = await getCollection('services', ({ data }) => data.lang === lang && !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Un servicio por su serviceKey estable e idioma. */
export async function getServiceByKey(
  key: string,
  lang: Lang
): Promise<CollectionEntry<'services'> | undefined> {
  const all = await getServices(lang);
  return all.find((s) => s.data.serviceKey === key);
}

/** Mapa serviceKey → slug por idioma (para hreflang de páginas de servicio). */
export async function serviceSlugMap(
  serviceKey: string
): Promise<Partial<Record<Lang, string>>> {
  const all = await getCollection('services', ({ data }) => data.serviceKey === serviceKey);
  const map: Partial<Record<Lang, string>> = {};
  for (const s of all) map[s.data.lang] = s.data.slug;
  return map;
}

export async function getGuides(lang: Lang): Promise<CollectionEntry<'guides'>[]> {
  const all = await getCollection('guides', ({ data }) => data.lang === lang && !data.draft);
  return all.sort((a, b) => b.data.updatedDate.getTime() - a.data.updatedDate.getTime());
}

export async function guideSlugMap(baseId: string): Promise<Partial<Record<Lang, string>>> {
  // agrupa por el nombre de fichero sin sufijo de idioma (p. ej. "bronquiolitis-bebe")
  const all = await getCollection('guides');
  const map: Partial<Record<Lang, string>> = {};
  for (const g of all) {
    const stem = g.id.replace(/\.(es|ca|en)$/, '');
    if (stem === baseId) map[g.data.lang] = g.data.slug;
  }
  return map;
}

export async function getGlobalFaqs(lang: Lang): Promise<{ q: string; a: string }[]> {
  const all = await getCollection('faqs', ({ data }) => data.lang === lang);
  return all.flatMap((f) => f.data.items);
}

export async function getTestimonials(lang: Lang) {
  const all = await getCollection('testimonials', ({ data }) => data.lang === lang);
  return all.flatMap((t) => t.data.items);
}
