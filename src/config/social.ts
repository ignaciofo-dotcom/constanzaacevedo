/**
 * Enlaces sociales y perfiles externos (PLAN §10.1 Instagram, §14 inputs).
 * Único archivo de configuración de redes: la home, el footer y el schema
 * `sameAs` se generan desde aquí. En Fase 2, el sync de Instagram lee de aquí.
 *
 * Deja en `null` lo que aún no esté confirmado por el owner — la UI oculta
 * automáticamente los enlaces nulos en lugar de apuntar a raíces vacías
 * (error del sitio actual, PLAN §2.7).
 */

export interface SocialProfile {
  name: string;
  url: string | null;
  handle?: string;
}

export const social: Record<string, SocialProfile> = {
  // [INPUT ★: URLs reales]
  instagram: { name: 'Instagram', url: null, handle: '@[INPUT]' },
  tiktok: { name: 'TikTok', url: null, handle: '@[INPUT]' },
  // [INPUT: enlace de Google Business Profile]
  googleBusiness: { name: 'Google', url: null },
  // [INPUT: ¿perfil Doctoralia existente o crear?]
  doctoralia: { name: 'Doctoralia', url: null },
};

/** URLs no nulas, para el `sameAs` del JSON-LD y el footer. */
export const socialSameAs = (): string[] =>
  Object.values(social)
    .map((p) => p.url)
    .filter((u): u is string => Boolean(u));
