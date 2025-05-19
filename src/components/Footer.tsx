import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const linkHoverClass = "hover:text-white transition-colors duration-300 ease-in-out";

  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5 tracking-tight">Recruitmen Europe Ltd</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">{t("footer.links")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/#services" className={`${linkHoverClass} text-gray-400`}>
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link to="/about" className={`${linkHoverClass} text-gray-400`}>
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={`${linkHoverClass} text-gray-400`}>
                  {t("footer.jobs")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${linkHoverClass} text-gray-400`}>
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">{t("footer.locations")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.germany")}</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.poland")}</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.czech")}</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.france")}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@recruiteurope.com" className={`${linkHoverClass} text-gray-400`}>
                  info@recruit-europe.eu
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <a href="tel:+48668771100" className={`${linkHoverClass} text-gray-400`}>
                  +48 668 77 11 00
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <a href="tel:+48668771100" className={`${linkHoverClass} text-gray-400`}>
                  +48 20 3286 1414
                </a>
              </li>
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <a
                  href="http://www.recruiteurope.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkHoverClass} text-gray-400`}
                >
                  www.recruit-europe.eu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-center space-y-3">
          <p className="text-gray-400">© {new Date().getFullYear()} Recruitmen Europe. All rights reserved.</p>
          <p className="text-gray-400">
            Created with ❤️ by{" "}
            <a
              href="https://jestemprogramista.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors duration-300 font-medium"
            >
              jestem programista
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
