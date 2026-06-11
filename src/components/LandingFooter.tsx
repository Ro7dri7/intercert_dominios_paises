import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTiktok,
    FaWhatsapp,
    FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiPhone } from 'react-icons/fi';
import { buildPortalUrl, getCountryFromHostname } from '../config/countries';

const LandingFooter = () => {
    const country = getCountryFromHostname();
    const year = new Date().getFullYear();
    const phoneDigits = country.phone.replace(/[^\d+]/g, '');
    const whatsappText = encodeURIComponent(
        `Hola vengo de ${country.tldDomain}. Deseo más información sobre los certificados ISO.`,
    );

    return (
        <footer className="lp-tv-footer">
            <div className="lp-tv-footer__main">
                <div className="lp-tv-footer__grid">
                    <div className="lp-tv-footer__col">
                        <a href={buildPortalUrl('/home', country)} className="lp-tv-footer__logo-link">
                            <img
                                src={country.logo}
                                alt={`Intercert ${country.name}`}
                                className="lp-tv-footer__logo"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        '/assets/images/intercert-latam-logo.svg';
                                }}
                            />
                        </a>
                        <p className="lp-tv-footer__desc">
                            Brindamos soluciones digitales de certificación y gestión empresarial que
                            convierten desafíos en oportunidades, respaldadas por auditorías acreditadas e
                            innovación constante.
                        </p>
                        <div className="lp-tv-footer__contact-row">
                            <a href={`tel:${phoneDigits}`} className="lp-tv-footer__phone">
                                <FiPhone aria-hidden="true" />
                                <span>{country.phone}</span>
                            </a>
                            <div className="lp-tv-footer__contact-icons">
                                <a
                                    href={`mailto:${country.email}`}
                                    aria-label="Correo"
                                >
                                    <FiMail />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${country.whatsappPhone}&text=${whatsappText}`}
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lp-tv-footer__col">
                        <h4 className="lp-tv-footer__title">Enlaces Rápidos</h4>
                        <ul className="lp-tv-footer__menu">
                            <li><a href={buildPortalUrl('/about', country)}>Nosotros</a></li>
                            <li><a href={buildPortalUrl('/services', country)}>Sectores</a></li>
                            <li><a href={buildPortalUrl('/blog', country)}>Blog</a></li>
                            <li><a href={buildPortalUrl('/contact', country)}>Contacto</a></li>
                        </ul>
                    </div>

                    <div className="lp-tv-footer__col">
                        <h4 className="lp-tv-footer__title">Servicios</h4>
                        <ul className="lp-tv-footer__menu">
                            <li><a href={buildPortalUrl('/certificacion-iso', country)}>Certificaciones ISO</a></li>
                            <li><a href={buildPortalUrl('/certificacion-personas', country)}>Certificaciones de Personas</a></li>
                            <li><a href={buildPortalUrl('/services', country)}>Sectores</a></li>
                        </ul>
                    </div>

                    <div className="lp-tv-footer__col">
                        <h4 className="lp-tv-footer__title">Información</h4>
                        <ul className="lp-tv-footer__menu">
                            <li><a href={buildPortalUrl('/terminos-uso', country)}>Términos de Uso</a></li>
                            <li><a href={buildPortalUrl('/politica-privacidad', country)}>Política de Privacidad</a></li>
                            <li><a href={buildPortalUrl('/faq', country)}>FAQs</a></li>
                            <li>
                                <a
                                    href={buildPortalUrl('/libro-de-reclamaciones', country)}
                                    className="lp-tv-footer__claims"
                                >
                                    <img
                                        src="https://www.saludayacucho.gob.pe/wp-content/uploads/imagenes/libro_reclamaciones.png"
                                        alt="Libro de Reclamaciones"
                                    />
                                    Libro de reclamaciones
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="lp-tv-footer__bottom">
                <p className="lp-tv-footer__copyright">
                    © {year}{' '}
                    <a href={buildPortalUrl('/', country)}>INTERCERT LATAM</a> Todos los derechos reservados
                </p>
                <div className="lp-tv-footer__social">
                    <a href="https://www.facebook.com/IntercertLatam/" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/intercertlatam/" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://www.tiktok.com/@intercertlatam" aria-label="TikTok">
                        <FaTiktok />
                    </a>
                    <a href="https://www.linkedin.com/company/intercertlatam" aria-label="LinkedIn">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://x.com/intercertlatam" aria-label="X">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.youtube.com/@intercertlatam" aria-label="YouTube">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
