export interface CountryConfig {
    code: string;
    name: string;
    tldDomain: string;
    phone: string;
    email: string;
    logo: string;
    whatsappPhone: string;
}

export const PORTAL_BASE = 'https://intercertlatam.com';

export const COUNTRY_CONFIGS: CountryConfig[] = [
    {
        code: 'co',
        name: 'Colombia',
        tldDomain: 'intercert.co',
        phone: '+57 320 3521254',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/intercert COL.png',
        whatsappPhone: '573203521254',
    },
    {
        code: 'pe',
        name: 'Perú',
        tldDomain: 'intercert.com.pe',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/Intercert peru.png',
        whatsappPhone: '51986123418',
    },
    {
        code: 'mx',
        name: 'México',
        tldDomain: 'intercert.mx',
        phone: '+52 1 55 3504 3437',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/intercert mex.png',
        whatsappPhone: '5215535043437',
    },
    {
        code: 'cr',
        name: 'Costa Rica',
        tldDomain: 'intercert.cr',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/intercert COSTAR.png',
        whatsappPhone: '51986123418',
    },
    {
        code: 'ec',
        name: 'Ecuador',
        tldDomain: 'intercert.ec',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/intercert  ECUADOR.png',
        whatsappPhone: '51986123418',
    },
    {
        code: 'pa',
        name: 'Panamá',
        tldDomain: 'intercert.pa',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        logo: '/assets/images/intercert PANAMA.png',
        whatsappPhone: '51986123418',
    },
];

const DOMAIN_ALIASES: Record<string, string> = {
    'intercer.mx': 'mx',
};

const DEFAULT_COUNTRY = COUNTRY_CONFIGS[0]!;

export const getCountryFromHostname = (hostname?: string): CountryConfig => {
    if (typeof window === 'undefined') return DEFAULT_COUNTRY;

    const host = (hostname ?? window.location.hostname).replace(/^www\./, '').toLowerCase();

    const aliasCode = DOMAIN_ALIASES[host];
    if (aliasCode) {
        return COUNTRY_CONFIGS.find((c) => c.code === aliasCode) ?? DEFAULT_COUNTRY;
    }

    return COUNTRY_CONFIGS.find((c) => c.tldDomain === host) ?? DEFAULT_COUNTRY;
};

/** URL al portal principal con prefijo de país — navegación en la misma pestaña */
export const buildPortalUrl = (path: string, country?: CountryConfig): string => {
    const c = country ?? getCountryFromHostname();
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${PORTAL_BASE}/${c.code}${normalized}`;
};

/** Compatibilidad con imports existentes en LandingPage */
export const buildCountryUrl = buildPortalUrl;

export default COUNTRY_CONFIGS;
