import { useState, type CSSProperties } from 'react';
import {
    FiTrendingDown,
    FiSmile,
    FiGlobe,
    FiUsers,
    FiAward,
    FiShield,
    FiCheckCircle,
    FiMenu,
    FiX,
    FiZap,
    FiBriefcase,
    FiChevronDown,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import {
    buildPortalUrl,
    getCountryFromHostname,
    VERIFY_CERTIFICATE_URL,
} from '../config/countries';
import LandingFooter from '../components/LandingFooter';
import './LandingPage.css';

const BENEFITS = [
    {
        icon: FiTrendingDown,
        title: 'Reducción de Costos',
        description: 'Mejora tu eficiencia y reduce desperdicios hasta en un 30%.',
        angle: -68,
    },
    {
        icon: FiSmile,
        title: 'Satisfacción del Cliente',
        description: 'Entrega proyectos de mayor calidad y en los tiempos establecidos.',
        angle: -40,
    },
    {
        icon: FiGlobe,
        title: 'Reconocimiento global',
        description: 'Accede a mercados globales con certificaciones internacionales.',
        angle: -12,
    },
    {
        icon: FiUsers,
        title: 'Mejor Gestión de Personal',
        description: 'Mejora la productividad y el bienestar de tu equipo.',
        angle: 16,
    },
    {
        icon: FiAward,
        title: 'Ventaja Competitiva',
        description: 'Gana ventaja en licitaciones con certificaciones ISO reconocidas globalmente.',
        angle: 44,
    },
    {
        icon: FiShield,
        title: 'Cumplimiento Legal',
        description: 'Garantiza el cumplimiento de normas locales e internacionales.',
        angle: 72,
    },
];

const ACHIEVEMENT_SLIDES: {
    id: number;
    gradient: string;
    icon: IconType;
    title: string;
    detail: string;
}[] = [
    {
        id: 1,
        gradient: 'linear-gradient(180deg, #1A43D5 0%, #5B8AE8 50%, #C3E9F9 100%)',
        icon: FiGlobe,
        title: 'Liderazgo Internacional',
        detail: 'Contamos con presencia activa y auditores en más de 8 países.',
    },
    {
        id: 2,
        gradient: 'linear-gradient(180deg, #12225D 0%, #2548C3 55%, #8AB1ED 100%)',
        icon: FiBriefcase,
        title: 'Trayectoria Comprobada',
        detail: 'Más de 500 empresas han elevado sus estándares trabajando con nosotros.',
    },
    {
        id: 3,
        gradient: 'linear-gradient(180deg, #1A43D5 0%, #8AB1ED 40%, #C3E9F9 100%)',
        icon: FiShield,
        title: 'Cobertura Integral ISO',
        detail: 'Especialistas en certificar normativas clave como ISO 9001, 14001, 27001 y 45001.',
    },
    {
        id: 4,
        gradient: 'linear-gradient(180deg, #036BF2 0%, #1A43D5 60%, #8AB1ED 100%)',
        icon: FiZap,
        title: 'Procesos Ágiles',
        detail: 'Auditorías y emisión de certificados optimizados por tecnología de punta.',
    },
];

const CHOOSE_ITEMS = [
    'Gana ventaja en licitaciones con certificaciones ISO reconocidas globalmente.',
    'Mejora tu eficiencia y reduce desperdicios hasta en un 30%.',
    'Garantiza el cumplimiento de normas locales e internacionales.',
    'Mejora la productividad y el bienestar de tu equipo.',
    'Accede a mercados globales con certificaciones internacionales.',
    'Entrega proyectos de mayor calidad y en los tiempos establecidos.',
];

const ISO_CARDS = [
    { name: 'ISO 9001', image: '/assets/images/ISOS/ISO 9001.png', slug: 'iso-9001' },
    { name: 'ISO 14001', image: '/assets/images/ISOS/ISO 14001.png', slug: 'iso-14001' },
    { name: 'ISO 45001', image: '/assets/images/ISOS/ISO 45001.png', slug: 'iso-45001' },
    { name: 'ISO 37001', image: '/assets/images/ISOS/ISO 37001.png', slug: 'iso-37001' },
];

const CLIENT_LOGOS = [
    '/assets/images/logos/INVA.jpeg',
    '/assets/images/logos/ADN.jpeg',
    '/assets/images/logos/pana autos logo.png',
    '/assets/images/logos/Overhead Door.jpeg',
    '/assets/images/logos/PROSEVIG.jpeg',
];

const PROCESS_STEPS = [
    { label: 'Diagnóstico Inicial', icon: 'ISO' },
    { label: 'Auditoría y Certificación', icon: 'audit' },
    { label: '¡Emisión del Certificado!', icon: 'cert' },
];

const SERVICE_LINKS = [
    { label: 'Certificaciones ISO', path: '/certificacion-iso' },
    { label: 'Certificación de Personas', path: '/certificacion-personas' },
];

const SECTOR_LINKS = [
    { label: 'Educativo', path: '/sector/educativo' },
    { label: 'Pesca', path: '/sector/pesca' },
    { label: 'Construcción', path: '/sector/construccion' },
    { label: 'Salud', path: '/sector/salud' },
    { label: 'Alimentos y Bebidas', path: '/sector/alimentos-bebidas' },
    { label: 'Agroexportación', path: '/sector/agroexportacion' },
    { label: 'Soluciones Sostenibles', path: '/sector/soluciones-sostenibles' },
    { label: 'Tecnologías de la Información', path: '/sector/tecnologias-informacion' },
];

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [sectorsOpen, setSectorsOpen] = useState(false);
    const country = getCountryFromHostname();
    const portal = (path: string) => buildPortalUrl(path, country);

    const helmet = useSeoMetadata({
        title: 'INTERCERT LATAM - Certificaciones ISO',
        description:
            'Transformamos la excelencia en tu ventaja competitiva. Certificaciones ISO 9001, 14001, 45001 y 37001 con más de 17 años de experiencia.',
    });

    const closeMenu = () => {
        setMenuOpen(false);
        setServicesOpen(false);
        setSectorsOpen(false);
    };

    return (
        <div className="landing-page">
            {helmet}
            <section className="lp-hero">
                <div className="lp-hero__shape lp-hero__shape--cyan" aria-hidden="true" />
                <div className="lp-hero__shape lp-hero__shape--gray" aria-hidden="true" />
                <div className="lp-hero__ellipse" aria-hidden="true" />

                <nav className="lp-nav">
                    <a href={portal('/home')}>
                        <img
                            src={country.logo}
                            alt="INTERCERT"
                            className="lp-nav__logo"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    '/assets/images/intercert-latam-logo.svg';
                            }}
                        />
                    </a>

                    <ul className={`lp-nav__links${menuOpen ? ' lp-nav__links--open' : ''}`}>
                        <li>
                            <a href={portal('/about')} onClick={closeMenu}>
                                Nosotros
                            </a>
                        </li>

                        <li
                            className={`lp-nav__dropdown${servicesOpen ? ' lp-nav__dropdown--open' : ''}`}
                        >
                            <button
                                type="button"
                                className="lp-nav__dropdown-toggle"
                                onClick={() => {
                                    setServicesOpen(!servicesOpen);
                                    setSectorsOpen(false);
                                }}
                                aria-expanded={servicesOpen}
                            >
                                Servicios
                                <FiChevronDown className="lp-nav__chevron" aria-hidden="true" />
                            </button>
                            <ul className="lp-nav__submenu">
                                {SERVICE_LINKS.map((item) => (
                                    <li key={item.path}>
                                        <a href={portal(item.path)} onClick={closeMenu}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li
                            className={`lp-nav__dropdown${sectorsOpen ? ' lp-nav__dropdown--open' : ''}`}
                        >
                            <button
                                type="button"
                                className="lp-nav__dropdown-toggle"
                                onClick={() => {
                                    setSectorsOpen(!sectorsOpen);
                                    setServicesOpen(false);
                                }}
                                aria-expanded={sectorsOpen}
                            >
                                Sectores
                                <FiChevronDown className="lp-nav__chevron" aria-hidden="true" />
                            </button>
                            <ul className="lp-nav__submenu">
                                {SECTOR_LINKS.map((item) => (
                                    <li key={item.path}>
                                        <a href={portal(item.path)} onClick={closeMenu}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <a href={portal('/contact')} onClick={closeMenu}>
                                Contacto
                            </a>
                        </li>
                    </ul>

                    <a href={VERIFY_CERTIFICATE_URL} className="lp-nav__verify">
                        Verificar Certificado
                    </a>

                    <button
                        type="button"
                        className="lp-nav__toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </nav>

                <div className="lp-hero__content">
                    <div className="lp-hero__text">
                        <h1>Transformamos la Excelencia en tu Ventaja Competitiva</h1>
                        <p>
                            Impulsa tu empresa con certificaciones iso. Mejora la calidad, seguridad y
                            gestión ambiental de tus proyectos
                        </p>
                        <div className="lp-hero__actions">
                            <a href={portal('/contact')} className="lp-btn lp-btn--primary">
                                ¡Contáctanos!
                            </a>
                            <a href={portal('/certificacion-iso')} className="lp-btn lp-btn--outline">
                                Ver certificaciones
                            </a>
                        </div>
                    </div>
                    <div className="lp-hero__image">
                        <img
                            src="/assets/images/landing/imagen_banner_landing_intercert.png"
                            alt="Equipo profesional con certificación ISO"
                        />
                    </div>
                </div>
            </section>

            <section className="lp-trusted">
                <h2 className="lp-trusted__title">Ellos ya confiaron en nosotros</h2>
                <div className="lp-trusted__marquee" aria-hidden="false">
                    <div className="lp-trusted__track">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                            <div key={i} className="lp-trusted__logo">
                                <img src={logo} alt={`Cliente ${(i % CLIENT_LOGOS.length) + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="lp-achievements">
                <h2 className="lp-section-title">Nuestros logros</h2>
                <div className="lp-achievements__grid">
                    <div className="lp-achievements__photo">
                        <img
                            src="/assets/images/landing/imagen_logros_landing_intercert.png"
                            alt="Profesional destacando logros"
                        />
                    </div>
                    <div className="lp-achievements__chart-wrap">
                        {ACHIEVEMENT_SLIDES.map((slide, index) => {
                            const Icon = slide.icon;
                            return (
                                <div
                                    key={slide.id}
                                    className="lp-achievements__chart-bar"
                                    style={{
                                        background: slide.gradient,
                                        zIndex: index + 1,
                                    }}
                                >
                                    <div className="lp-achievements__chart-content">
                                        <Icon className="lp-achievements__chart-icon" aria-hidden="true" />
                                        <span className="lp-achievements__chart-value">{slide.title}</span>
                                        <span className="lp-achievements__chart-label">{slide.detail}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="lp-process" id="proceso">
                <h2 className="lp-process__title">Hazlo en 3 pasos</h2>
                <div className="lp-process__grid">
                    <div className="lp-timeline">
                        {PROCESS_STEPS.map((step) => (
                            <div key={step.label} className="lp-timeline__item">
                                <div className="lp-timeline__circle">
                                    {step.icon === 'ISO' ? (
                                        <span>ISO</span>
                                    ) : step.icon === 'audit' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="8" r="6" />
                                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                                        </svg>
                                    )}
                                </div>
                                <span className="lp-timeline__label">{step.label}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="lp-process__video">
                            <img
                                src="/assets/images/landing/img_3pasos_landing_intercert.jpg"
                                alt="Proceso de certificación ISO"
                            />
                            <button type="button" className="lp-process__play" aria-label="Reproducir video" />
                        </div>
                    </div>
                </div>
                <div className="lp-process__cta">
                    <a href={portal('/contact')} className="lp-btn lp-btn--navy">
                        ¡Contáctanos!
                    </a>
                </div>
            </section>

            <section className="lp-iso">
                <h2 className="lp-section-title lp-section-title--gradient">Certificaciones ISO</h2>
                <div className="lp-iso__cards">
                    {ISO_CARDS.map((iso) => (
                        <a
                            key={iso.slug}
                            href={portal(`/certificacion-iso/${iso.slug}`)}
                            className="lp-iso__card"
                        >
                            <img
                                src={iso.image}
                                alt={iso.name}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/assets/images/ISOS/ISO 9001.png';
                                }}
                            />
                        </a>
                    ))}
                </div>
                <div className="lp-iso__cta">
                    <a href={portal('/certificacion-iso')} className="lp-btn lp-btn--navy">
                        Ver más ISOs
                    </a>
                </div>
            </section>

            <section className="lp-benefits">
                <h2 className="lp-section-title lp-section-title--gradient">¿Por qué certificarse?</h2>
                <div className="lp-benefits__grid">
                    <div className="lp-benefits__visual">
                        <div className="lp-benefits__image-wrap">
                            <img
                                src="/assets/images/landing/img_xqcertificarse_landing_intercert.jpg"
                                alt="Certificación empresarial"
                            />
                            {BENEFITS.map((benefit) => (
                                <div
                                    key={benefit.title}
                                    className="lp-benefits__orbit-icon"
                                    style={{ '--orbit-angle': `${benefit.angle}deg` } as CSSProperties}
                                >
                                    <benefit.icon />
                                </div>
                            ))}
                        </div>
                    </div>
                    <ul className="lp-benefits__list">
                        {BENEFITS.map((benefit) => (
                            <li key={benefit.title} className="lp-benefits__item">
                                <div>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="lp-choose">
                <h2 className="lp-section-title lp-section-title--blue">¿Por qué escoger nuestro servicio?</h2>
                <div className="lp-choose__grid">
                    <div className="lp-choose__illustration">
                        <img
                            src="/assets/images/landing/img_xq_nostros_landing_intercert.png"
                            alt="Ilustración consultoría"
                        />
                    </div>
                    <ul className="lp-choose__list">
                        {CHOOSE_ITEMS.map((item) => (
                            <li key={item} className="lp-choose__item">
                                <FiCheckCircle className="lp-choose__check" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default LandingPage;
