import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroText from "./components/IntroText";
import Footer from "./components/Footer";
import "./locales/i18n";
import { useTranslation } from "react-i18next";

// Lazy load components for better performance
const Services = lazy(() => import("./components/Services"));
const JobListings = lazy(() => import("./components/JobListings"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Jobs = lazy(() => import("./pages/Jobs")); // Import the new Jobs page
const JobDetail = lazy(() => import("./pages/JobDetail"));

// Home component combining Hero, Services, and JobListings
const Home = () => (
  <>
    <Hero />
    <IntroText />
    <Suspense fallback={<div className="text-center p-10">Loading Services...</div>}>
      <Services />
    </Suspense>
    <Suspense fallback={<div className="text-center p-10">Loading Jobs...</div>}>
      <JobListings />
    </Suspense>
  </>
);

function App() {
  // Navbar height is fixed at h-16 (4rem or 64px)
  const navbarHeight = "pt-16"; // Tailwind class for padding-top: 4rem;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("i18nextLng") || "en");
  }, []);

  return (
    // Using white background, slightly darker base text for contrast
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {" "}
      {/* Changed text-gray-800 to text-gray-900 and ensured font-sans base */}
      <Navbar />
      {/* Apply top padding to main content area to account for fixed navbar */}
      <main className={`flex-grow ${navbarHeight}`}>
        <Suspense fallback={<div className="text-center p-10">{t("loading")}</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobs" element={<Jobs />} /> {/* Add route for Jobs page */}
            <Route path="/jobs/:id" element={<JobDetail />} />
            {/* Consider adding a dedicated 404 component */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
