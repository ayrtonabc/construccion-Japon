import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, Briefcase } from "lucide-react";
import Modal from "./Modal"; // Import the Modal component
import JobSeekerForm from "./JobSeekerForm"; // Import the Job Seeker form
import EmployerForm from "./EmployerForm"; // Import the Employer form
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [userType, setUserType] = useState<"seeker" | "employer" | null>(null); // State for selected user type in modal
  const location = useLocation();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
    setIsModalOpen(false); // Close modal on route change
    setUserType(null); // Reset user type on route change
  }, [location]);

  const logoSrc = "/logoblack.png";
  const logoSrcFull = "/logoblack-full.png";
  const enBag = "/img/us_bag.png";
  const deBag = "/img/pl_bag.png";
  const jpBag = "/img/jp_bag.png";

  const linkClasses = "text-gray-800 hover:text-blue-600 transition-colors duration-300 text-base font-medium";
  const activeLinkClasses = "text-blue-600 font-semibold border-b-2 border-blue-600";
  const buttonClasses = "px-6 py-2.5 rounded-lg transition-all duration-300 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md";

  const getLinkClass = (path: string) => {
    if (path === "/#services" && location.pathname === "/" && location.hash === "#services") {
      return `${linkClasses} ${activeLinkClasses}`;
    }
    if (location.pathname === path && location.hash !== "#services") {
      return `${linkClasses} ${activeLinkClasses}`;
    }
    if (path === "/jobs" && location.pathname.startsWith("/jobs/")) {
      return `${linkClasses} ${activeLinkClasses}`;
    }
    return linkClasses;
  };

  const getMobileLinkClass = (path: string) => {
    const baseMobileClass = "block px-4 py-3 rounded-lg text-base font-tempered text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200";
    if (path === "/#services" && location.pathname === "/" && location.hash === "#services") {
      return `${baseMobileClass} bg-blue-100 text-blue-600 font-semibold`;
    }
    if (location.pathname === path && location.hash !== "#services") {
      return `${baseMobileClass} bg-blue-100 text-blue-600 font-semibold`;
    }
    if (path === "/jobs" && location.pathname.startsWith("/jobs/")) {
      return `${baseMobileClass} bg-blue-100 text-blue-600 font-semibold`;
    }
    return baseMobileClass;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (path.startsWith("/#")) {
      e.preventDefault();
      const targetId = path.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = 96; // Adjusted for larger navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        window.location.href = path;
      }
    }
    setIsMobileMenuOpen(false);
  };

  const openModal = () => {
    setUserType(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectUserType = (type: "seeker" | "employer") => {
    setUserType(type);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("i18nextLng", language); // Store the selected language in local storage
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 bg-white ${isScrolled ? "shadow-lg" : "shadow-sm"} transition-shadow duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo - Even larger size */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={logoSrc} alt="Recruit Europe Logo" className="h-full w-28 md:hidden" loading="eager" decoding="async" />
                <img src={logoSrcFull} alt="Recruit Europe Logo" className="h-full w-96 hidden md:block" loading="eager" decoding="async" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {/* <Link to="/" className={getLinkClass("/")} onClick={(e) => handleNavClick(e, "/")}>
                {t("navbar.home")}
              </Link> */}
              <Link to="/#companies" className={getLinkClass("/#companies")} onClick={(e) => handleNavClick(e, "/#companies")}>
                {t("navbar.companies")}
              </Link>
              <Link to="/#candidates" className={getLinkClass("/#candidates")} onClick={(e) => handleNavClick(e, "/#candidates")}>
                {t("navbar.candidates")}
              </Link>
              <Link to="/about" className={getLinkClass("/about")} onClick={(e) => handleNavClick(e, "/about")}>
                {t("navbar.about")}
              </Link>
              <Link to="/jobs" className={getLinkClass("/jobs")} onClick={(e) => handleNavClick(e, "/jobs")}>
                {t("navbar.jobs")}
              </Link>
              <Link to="/contact" className={getLinkClass("/contact")} onClick={(e) => handleNavClick(e, "/contact")}>
                {t("navbar.contact")}
              </Link>
              <button onClick={openModal} className={buttonClasses}>
                {t("navbar.start")}
              </button>
            </div>

            {/* Language Buttons */}
            <div className="flex items-center space-x-3">
              <button onClick={() => changeLanguage("en")} className={`w-8 h-8 rounded-full border-2 ${i18n.language === "en" ? "border-blue-600" : "border-gray-300"} hover:border-blue-400 transition-colors duration-200`} title="English">
                <img src={enBag} alt="English" className="w-full h-full rounded-full object-cover" />
              </button>
              <button onClick={() => changeLanguage("de")} className={`w-8 h-8 rounded-full border-2 ${i18n.language === "de" ? "border-blue-600" : "border-gray-300"} hover:border-blue-400 transition-colors duration-200`} title="German">
                <img src={deBag} alt="German" className="w-full h-full rounded-full object-cover" />
              </button>
              <button onClick={() => changeLanguage("ja")} className={`w-8 h-8 rounded-full border-2 ${i18n.language === "ja" ? "border-blue-600" : "border-gray-300"} hover:border-blue-400 transition-colors duration-200`} title="Japanese">
                <img src={jpBag} alt="Japanese" className="w-full h-full rounded-full object-cover" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen} aria-label="Open main menu">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-200`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <Link to="/" className={getMobileLinkClass("/")} onClick={(e) => handleNavClick(e, "/")}>
              {t("navbar.home")}
            </Link> */}
            <Link to="/#companies" className={getMobileLinkClass("/#companies")} onClick={(e) => handleNavClick(e, "/#services")}>
              {t("navbar.companies")}
            </Link>
            <Link to="/#candidates" className={getMobileLinkClass("/#candidates")} onClick={(e) => handleNavClick(e, "/#services")}>
              {t("navbar.candidates")}
            </Link>
            <Link to="/about" className={getMobileLinkClass("/about")} onClick={(e) => handleNavClick(e, "/about")}>
              {t("navbar.about")}
            </Link>
            <Link to="/jobs" className={getMobileLinkClass("/jobs")} onClick={(e) => handleNavClick(e, "/jobs")}>
              {t("navbar.jobs")}
            </Link>
            <Link to="/contact" className={getMobileLinkClass("/contact")} onClick={(e) => handleNavClick(e, "/contact")}>
              {t("navbar.contact")}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-5">
            <button onClick={openModal} className={`${buttonClasses} w-full text-center`}>
              {t("navbar.start")}
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {!userType ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{t("navbar.question")}</h3>
            <div className="mt-2 space-y-4 sm:space-y-0 sm:flex sm:space-x-6 justify-center">
              <button onClick={() => selectUserType("seeker")} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                <User className="mr-2 h-5 w-5" />
                {t("navbar.for_candidate")}
              </button>
              <button onClick={() => selectUserType("employer")} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-semibold rounded-lg text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                <Briefcase className="mr-2 h-5 w-5" />
                {t("navbar.for_companies")}
              </button>
            </div>
          </div>
        ) : userType === "seeker" ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t("navbar.for_candidate_title")}</h3>
            <JobSeekerForm />
            <button onClick={() => setUserType(null)} className="mt-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              {t("navbar.back")}
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t("navbar.for_companies_title")}</h3>
            <EmployerForm />
            <button onClick={() => setUserType(null)} className="mt-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              {t("navbar.back")}
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Navbar;
