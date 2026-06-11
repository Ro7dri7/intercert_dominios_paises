/**
 * Dominios TLD libres de INTERCERT por país.
 * Todos apuntan al mismo sitio estático (GitHub Pages).
 */
export const COUNTRY_DOMAINS = [
    { code: 'co', country: 'Colombia', domain: 'intercert.co' },
    { code: 'mx', country: 'México', domain: 'intercert.mx' },
    { code: 'ec', country: 'Ecuador', domain: 'intercert.ec' },
    { code: 'pa', country: 'Panamá', domain: 'intercert.pa' },
    { code: 'pe', country: 'Perú', domain: 'intercert.com.pe' },
    { code: 'cr', country: 'Costa Rica', domain: 'intercert.cr' },
    { code: 'es', country: 'España', domain: 'intercert.es' },
] as const;

export const ALL_DEPLOY_DOMAINS = COUNTRY_DOMAINS.map((entry) => entry.domain);

export const PRIMARY_DOMAIN = 'intercert.co';

export const getDomainByCode = (code: string) =>
    COUNTRY_DOMAINS.find((entry) => entry.code === code);

export const getDomainFromHostname = (hostname: string) => {
    const normalized = hostname.replace(/^www\./, '').toLowerCase();
    return COUNTRY_DOMAINS.find((entry) => entry.domain === normalized);
};
