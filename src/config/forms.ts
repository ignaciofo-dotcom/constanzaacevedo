/**
 * Proveedor de formularios intercambiable (PLAN §7.6, §10.2.6).
 * En Fase 2 se sustituye Web3Forms por la API propia sin tocar las páginas:
 * basta cambiar `endpoint` y el mapeo de campos aquí.
 */
export const forms = {
  provider: 'web3forms' as 'web3forms' | 'formspark' | 'custom',
  // [INPUT: crear access key gratuita en https://web3forms.com y pegarla aquí]
  accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '[INPUT: WEB3FORMS_ACCESS_KEY]',
  endpoint: 'https://api.web3forms.com/submit',
  // email de destino documentado; Web3Forms lo asocia a la access key
  to: 'contacto@constanzaacevedo.es',
};
