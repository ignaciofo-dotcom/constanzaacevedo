/**
 * Feature flags (PLAN §10.2). Activan/desactivan bloques opcionales sin tocar
 * componentes. La home reserva un bloque "Últimos posts" oculto por defecto
 * (§10.1) — se activa con `instagramFeed` cuando llegue el sync de Fase 2.
 */
export const flags = {
  /** Bloque "Últimos posts" de Instagram en la home (Fase 2). */
  instagramFeed: false,
  /** Banner de consentimiento + GA4 (§7.7). Alternativa: Plausible sin banner. */
  analyticsConsentBanner: false,
  /** Mostrar tarifas "desde X €" (§14.6, recomendado sí cuando haya cifras). */
  showPricing: false,
} as const;
