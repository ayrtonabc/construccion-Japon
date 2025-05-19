import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { t } = useTranslation();

  const slides = [
    {
      id: "talent",
      title: t("hero.page_1.title"),
      subtitle: t("hero.page_1.subtitle"),
      image: "img/hero 1.jpg",
      cta: t("hero.page_1.button"),
      link: "/jobs",
    },
    {
      id: "expertise",
      title: t("hero.page_2.title"),
      subtitle: t("hero.page_2.subtitle"),
      image: "img/hero 2.jpg",
      cta: t("hero.page_2.button"),
      link: "/about",
    },
    {
      id: "network",
      title: t("hero.page_3.title"),
      subtitle: t("hero.page_3.subtitle"),
      image: "img/hero 3.jpg",
      cta: t("hero.page_3.button"),
      link: "/contact",
    },
  ];

  const changeSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 800);
      }, 200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentSlide + 1) % slides.length;
        changeSlide(nextIndex);
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning, changeSlide]);

  const buttonClasses =
    "inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-[#1A3C87] rounded-lg hover:bg-[#153066] transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-[#2C54E7]/50 shadow-lg";

  return (
    <section className="relative h-screen font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]" aria-label="Hero section">
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={currentSlide !== index}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={index === 0 ? "high" : "low"}
            />
            {/* Subtle gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
          </div>
        ))}

        {/* Text Content Area */}
        <div className="absolute inset-0 z-20 flex items-end pb-4 justify-center">
          <div className="max-w-7xl mx-auto px-3 lg:px-6 w-full text-left">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-800 ease-out ${
                  currentSlide === index
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform -translate-y-8 pointer-events-none absolute w-full left-0 right-0 px-6 lg:px-12"
                }`}
                aria-hidden={currentSlide !== index}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight [text-shadow:0_4px_12px_rgba(0,0,0,0.7)]">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-2xl text-gray-100 mb-4 max-w-5xl leading-relaxed font-medium [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                  {slide.subtitle}
                </p>
                <Link to={slide.link} className={buttonClasses}>
                  {slide.cta}
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <nav
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-30"
          aria-label="Slide navigation"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 rounded-full ${
                currentSlide === index
                  ? "w-4 h-4 bg-white"
                  : "w-3 h-3 bg-white/60 hover:bg-white/90"
              }`}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Hero;
