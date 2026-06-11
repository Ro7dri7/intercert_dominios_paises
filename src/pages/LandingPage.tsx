import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
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
    FiSearch,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { FaStar, FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { buildCountryUrl } from '../config/countries';
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
    value: string;
    label: string;
}[] = [
    {
        id: 1,
        gradient: 'linear-gradient(180deg, #1A43D5 0%, #5B8AE8 50%, #C3E9F9 100%)',
        icon: FiAward,
        value: '+10 Años',
        label: 'de Experiencia',
    },
    {
        id: 2,
        gradient: 'linear-gradient(180deg, #12225D 0%, #2548C3 55%, #8AB1ED 100%)',
        icon: FiUsers,
        value: '+500',
        label: 'Empresas Certificadas',
    },
    {
        id: 3,
        gradient: 'linear-gradient(180deg, #1A43D5 0%, #8AB1ED 40%, #C3E9F9 100%)',
        icon: FiGlobe,
        value: 'Presencia',
        label: 'Internacional',
    },
    {
        id: 4,
        gradient: 'linear-gradient(180deg, #036BF2 0%, #1A43D5 60%, #8AB1ED 100%)',
        icon: FiSearch,
        value: 'Auditores',
        label: 'Especializados',
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

const TESTIMONIALS = [
    {
        name: 'Carlos Mendoza',
        role: 'Gerente General',
        company: 'Constructora Andes SAC',
        quote:
            'Gracias a Intercert obtuvimos la certificación ISO 9001 que nos permitió ganar la licitación más importante del año. El proceso fue profesional y el equipo muy capacitado.',
        avatar: '/assets/images/landing/testimonial-avatar.jpg',
    },
    {
        name: 'Carlos Mendoza',
        role: 'Gerente General',
        company: 'Constructora Andes SAC',
        quote:
            'Gracias a Intercert obtuvimos la certificación ISO 9001 que nos permitió ganar la licitación más importante del año. El proceso fue profesional y el equipo muy capacitado.',
        avatar: '/assets/images/landing/testimonial-avatar.jpg',
    },
    {
        name: 'Carlos Mendoza',
        role: 'Gerente General',
        company: 'Constructora Andes SAC',
        quote:
            'Gracias a Intercert obtuvimos la certificación ISO 9001 que nos permitió ganar la licitación más importante del año. El proceso fue profesional y el equipo muy capacitado.',
        avatar: '/assets/images/landing/testimonial-avatar.jpg',
    },
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

const FOOTER_CERTS = [
    { label: 'ISO 9001 - Calidad', path: '/certificacion-iso/iso-9001' },
    { label: 'ISO 14001 - Ambiental', path: '/certificacion-iso/iso-14001' },
    { label: 'ISO 45001 - Seguridad', path: '/certificacion-iso/iso-45001' },
    { label: 'ISO 37001 - Antisoborno', path: '/certificacion-iso/iso-37001' },
    { label: 'Consultoría Especializada', path: '/services' },
];

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const helmet = useSeoMetadata({
        title: 'INTERCERT LATAM - Certificaciones ISO',
        description:
            'Transformamos la excelencia en tu ventaja competitiva. Certificaciones ISO 9001, 14001, 45001 y 37001 con más de 17 años de experiencia.',
    });

    const navLinks = [
        { label: 'Nosotros', to: buildCountryUrl('/about') },
        { label: 'Servicios', to: buildCountryUrl('/services') },
        { label: 'Sectores', to: buildCountryUrl('/certificacion-iso') },
        { label: 'Contacto', to: buildCountryUrl('/contact') },
    ];

    return (
        <div className="landing-page">
            {helmet}
            {/* Hero */}
            <section className="lp-hero">
                <div className="lp-hero__shape lp-hero__shape--cyan" aria-hidden="true" />
                <div className="lp-hero__shape lp-hero__shape--gray" aria-hidden="true" />
                <div className="lp-hero__ellipse" aria-hidden="true" />

                <nav className="lp-nav">
                    <Link to={buildCountryUrl('/home')}>
                        <img
                            src="/assets/images/Intercert con R Blanco.png"
                            alt="INTERCERT"
                            className="lp-nav__logo"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/images/intercert-latam-logo.svg';
                            }}
                        />
                    </Link>

                    <ul className={`lp-nav__links${menuOpen ? ' lp-nav__links--open' : ''}`}>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link to={link.to} onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to={buildCountryUrl('/verify-certificate')} className="lp-nav__verify">
                        Verificar Certificado
                    </Link>

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
                            <Link to={buildCountryUrl('/contact')} className="lp-btn lp-btn--primary">
                                ¡Contáctanos!
                            </Link>
                            <Link to={buildCountryUrl('/certificacion-iso')} className="lp-btn lp-btn--outline">
                                Ver certificaciones
                            </Link>
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

            {/* Trusted By */}
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

            {/* Achievements */}
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
                                        <span className="lp-achievements__chart-value">{slide.value}</span>
                                        <span className="lp-achievements__chart-label">{slide.label}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process */}
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
                    <Link to={buildCountryUrl('/contact')} className="lp-btn lp-btn--navy">
                        ¡Contáctanos!
                    </Link>
                </div>
            </section>

            {/* ISO Certifications */}
            <section className="lp-iso">
                <h2 className="lp-section-title lp-section-title--gradient">Certificaciones ISO</h2>
                <div className="lp-iso__cards">
                    {ISO_CARDS.map((iso) => (
                        <Link
                            key={iso.slug}
                            to={buildCountryUrl(`/certificacion-iso/${iso.slug}`)}
                            className="lp-iso__card"
                        >
                            <img
                                src={iso.image}
                                alt={iso.name}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/assets/images/ISOS/ISO 9001.png';
                                }}
                            />
                        </Link>
                    ))}
                </div>
                <div className="lp-iso__cta">
                    <Link to={buildCountryUrl('/certificacion-iso')} className="lp-btn lp-btn--navy">
                        Ver más ISOs
                    </Link>
                </div>
            </section>

            {/* Why Certify */}
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

            {/* Why Choose Us */}
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

            {/* Testimonials */}
            <section className="lp-testimonials">
                <h2 className="lp-section-title lp-section-title--blue">Lo que dicen nuestros clientes</h2>
                <div className="lp-testimonials__marquee">
                    <div className="lp-testimonials__track">
                        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <article key={i} className="lp-testimonial-card">
                                <div className="lp-testimonial-card__header">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="lp-testimonial-card__avatar"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                '/assets/images/logos/INVA.jpeg';
                                        }}
                                    />
                                    <div>
                                        <h3 className="lp-testimonial-card__name">{t.name}</h3>
                                        <p className="lp-testimonial-card__role">{t.role}</p>
                                        <p className="lp-testimonial-card__company">{t.company}</p>
                                    </div>
                                </div>
                                <blockquote className="lp-testimonial-card__quote">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <div className="lp-testimonial-card__stars">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <FaStar key={si} />
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="lp-footer">
                <div className="lp-footer__grid">
                    <div>
                        <img
                            src="/assets/images/LOGO-INTERCERT-BLANCO.png"
                            alt="INTERCERT"
                            className="lp-footer__logo"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/images/Intercert con R Blanco.png';
                            }}
                        />
                        <p className="lp-footer__desc">
                            Especialistas en certificaciones ISO. Más de 17 años transformando empresas
                            hacia la excelencia operacional.
                        </p>
                        <div className="lp-footer__social">
                            <a href="https://wa.me/51986123418" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FaWhatsapp size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="lp-footer__heading">Certificaciones</h3>
                        <ul className="lp-footer__links">
                            {FOOTER_CERTS.map((cert) => (
                                <li key={cert.label}>
                                    <Link to={buildCountryUrl(cert.path)}>{cert.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lp-footer__contact">
                        <h3 className="lp-footer__heading">Contacto</h3>
                        <p>+51 986 123 418</p>
                        <p>info@intercertlatam.com</p>
                        <p>Centro Empresarial PLEXUS, San Miguel, Lima</p>
                        <p>Lun - Vie: 9:00 AM - 5:30 PM</p>
                    </div>
                </div>
                <hr className="lp-footer__divider" />
                <p className="lp-footer__copyright">
                    © 2024 Intercert Perú. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
