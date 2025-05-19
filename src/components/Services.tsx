import React, { useState, useEffect } from "react";
import { Briefcase, Building2, CalendarClock, CheckCircle, Clock, Cpu, DollarSign, Euro, FileLineChart, FileText, Globe2, HeartHandshake, Info, MapPin, Presentation, Projector, Search, Shield, UserCheck, Users, Workflow, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
    <Icon className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
    <h4 className="text-3xl font-bold text-gray-900 mb-2">{value}</h4>
    <p className="text-gray-600">{label}</p>
  </div>
);

const ProcessStep = ({ number, icon: Icon, hidden = false, title, description }) => (
  <div className="flex items-start space-x-4 p-4">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2563EB] text-white font-bold text-xl shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">{number}</div>
    <div className="flex-1">
      <div className="flex items-center mb-2">
        {!hidden && <Icon className="w-6 h-6 text-[#2563EB] mr-2" />}
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const FeatureCard = ({ image, icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="py-6 px-4">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-[#2C54E7] mr-3" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Services = () => {
  const { t, i18n } = useTranslation();
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isCompanyOpen || isCandidateOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isCompanyOpen, isCandidateOpen]);
  
  // Forzar la carga de traducciones cuando cambia el idioma
  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie el idioma
    // para asegurar que las traducciones se carguen correctamente
  }, [i18n.language]);

  const processSteps = [
    { number: "01", icon: FileText, title: t("services.steps.steps.step_1.title"), description: t("services.steps.steps.step_1.description") },
    { number: "02", icon: Search, title: t("services.steps.steps.step_2.title"), description: t("services.steps.steps.step_2.description") },
    { number: "03", icon: UserCheck, title: t("services.steps.steps.step_3.title"), description: t("services.steps.steps.step_3.description") },
    { number: "04", icon: Users, title: t("services.steps.steps.step_4.title"), description: t("services.steps.steps.step_4.description") },
    { number: "05", icon: Presentation, title: t("services.steps.steps.step_5.title"), description: t("services.steps.steps.step_5.description") },
    { number: "06", icon: Projector, title: t("services.steps.steps.step_6.title"), description: t("services.steps.steps.step_6.description") },
    { number: "07", icon: UserCheck, title: t("services.steps.steps.step_7.title"), description: t("services.steps.steps.step_7.description") },
    { number: "08", icon: FileLineChart, title: t("services.steps.steps.step_8.title"), description: t("services.steps.steps.step_8.description") },
  ];

  const ModalSection = ({ titleKey, contentKey, contentKey2 = null, titleText = null, contentText = null, contentText2 = null, icon = FileText }) => {
    const Icon = icon;
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 mb-6 transform hover:scale-[1.01]">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full mr-4 shadow-inner">
            <Icon className="w-6 h-6 text-blue-700" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-3 text-blue-700">
              {titleText || (titleKey && t(titleKey))}
            </h4>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{contentText || (contentKey && t(contentKey))}</p>
            {(contentText2 || contentKey2) && (
              <p className="mt-3 whitespace-pre-line text-gray-700 leading-relaxed">
                {contentText2 || (contentKey2 && t(contentKey2))}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Asegurarse que t() se llama cuando el modal es visible y el idioma es el correcto
  const companyModalSections = t("services.for_companies.modal.sections", { returnObjects: true }) || [];
  
  // Acceder a las traducciones del modal para candidatos con la estructura correcta
  // Esto asegura que funcione tanto para japonés como para polaco
  const candidateModalSections = t("services.for_recrutiers.modal", { returnObjects: true }) || {};
  
  // Verificar si estamos usando el idioma polaco para asegurar compatibilidad
  useEffect(() => {
    // Este efecto se ejecuta cuando cambia el idioma para asegurar que las traducciones se carguen correctamente
    console.log("Idioma actual:", i18n.language);
    console.log("Traducciones cargadas para candidatos:", candidateModalSections);
  }, [i18n.language, candidateModalSections]);


  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard image="/img/card-1.jpg" icon={Cpu} title={t("services.service_1.title")} description={t("services.service_1.description")} />
          <FeatureCard image="/img/card-2.jpg" icon={CalendarClock} title={t("services.service_2.title")} description={t("services.service_2.description")} />
          <FeatureCard image="/img/card-3.jpg" icon={Globe2} title={t("services.service_3.title")} description={t("services.service_3.description")} />
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("services.profile.title")}</h2>
                <p className="text-lg text-gray-600 max-w-xl">{t("services.profile.description")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard icon={Building2} value="540+" label={t("services.profile.icons.icon_1")} />
                <StatsCard icon={Globe2} value="16+" label={t("services.profile.icons.icon_2")} />
                <StatsCard icon={Users} value="98%" label={t("services.profile.icons.icon_3")} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center" id="companies">
            <div className="rounded-2xl overflow-hidden shadow-lg order-last md:order-first">
              <img src="./img/for-candidates.jpg" alt="Companies" className="w-full h-auto object-cover rounded-2xl" />
            </div>
            <div className="p-8 order-first md:order-last">
              <Building2 className="w-12 h-12 text-[#2C54E7] mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("services.for_companies.title")}</h3>
              <p className="text-gray-600 mb-6">{t("services.for_companies.description")}</p>
              <ul className="space-y-4 mb-6">
                {[t("services.for_companies.items.item_1"), t("services.for_companies.items.item_2"), t("services.for_companies.items.item_3")].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2C54E7] mr-3 mt-1 shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center md:justify-start">
                <button onClick={() => setIsCompanyOpen(true)} type="button" className="inline-block mt-4 bg-[#2C54E7] text-white px-8 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium">
                  {t("services.for_companies.button")}
                </button>
              </div>
            </div>
          </div>
          <div id="candidates" className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="p-8">
              <Users className="w-12 h-12 text-[#2C54E7] mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("services.for_recrutiers.title")}</h3>
              <p className="text-gray-600 mb-6">{t("services.for_recrutiers.description_1")}</p>
              <p className="text-gray-600 mb-6">{t("services.for_recrutiers.description_2")}</p>
              <div className="flex justify-center md:justify-start">
                <button onClick={() => setIsCandidateOpen(true)} type="button" className="inline-block mt-4 bg-[#2C54E7] text-white px-8 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium">
                  {t("services.for_companies.button")}
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="./img/for-companies.jpg" alt="Job Seekers" className="w-full h-auto object-cover rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("services.steps.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.steps.description")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} number={step.number} icon={step.icon} hidden={step.hidden ?? false} title={step.title} description={step.description} />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-[#2C54E7] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("services.confidentiality.title")}</h3>
            <p className="text-gray-600">{t("services.confidentiality.description")}</p>
          </div>
        </div>

        {isCompanyOpen && (
          <div className="fixed inset-0 z-[2000] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
            <div className="w-screen h-screen max-w-5xl mx-auto bg-white shadow-2xl flex flex-col rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-blue-100 to-indigo-100">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-blue-700" />
                  {t("services.for_companies.modal.main_title")}
                </h3>
                <button
                  onClick={() => setIsCompanyOpen(false)}
                  className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md"
                  aria-label={t("common.close", "Close")}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow bg-gradient-to-b from-white to-gray-50">
                <div className="text-gray-700 space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-md mb-8 transform hover:scale-[1.01] transition-all duration-300">
                    <h3 className="text-xl font-bold mb-3 text-blue-800 flex items-center">
                      <Building2 className="w-6 h-6 mr-2 text-blue-700" />
                      {t("services.for_companies.title")}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{t("services.for_companies.description")}</p>
                  </div>
                  {Array.isArray(companyModalSections) && companyModalSections.length > 0 ? (
                    // Si tenemos secciones en el formato esperado, las mostramos
                    companyModalSections.map((section, index) => {
                      // Seleccionar un icono diferente para cada sección
                      const icons = [Cpu, CalendarClock, Globe2, Users, Presentation, DollarSign, HeartHandshake, Shield];
                      const Icon = icons[index % icons.length];
                      
                      return (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 mb-6 transform hover:scale-[1.01]">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-3 rounded-full mr-4 shadow-inner">
                              <Icon className="w-6 h-6 text-blue-700" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold mb-3 text-blue-700">{section.title}</h4>
                              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Fallback: Si no tenemos secciones en el formato esperado, intentamos acceder a las traducciones directamente
                    // Esto es útil para idiomas como el polaco donde la estructura puede ser diferente
                    Array.from({ length: 12 }, (_, index) => {
                      const icons = [Cpu, CalendarClock, Globe2, Users, Presentation, DollarSign, HeartHandshake, Shield];
                      const Icon = icons[index % icons.length];
                      const sectionPath = `services.for_companies.modal.sections.${index}`;
                      const title = t(`${sectionPath}.title`);
                      const content = t(`${sectionPath}.content`);
                      
                      // Solo mostrar si tenemos título y contenido (evitar secciones vacías)
                      if (title !== `${sectionPath}.title` && content !== `${sectionPath}.content`) {
                        return (
                          <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 mb-6 transform hover:scale-[1.01]">
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-3 rounded-full mr-4 shadow-inner">
                                <Icon className="w-6 h-6 text-blue-700" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-3 text-blue-700">{title}</h4>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  )}
                </div>
              </div>
              <div className="flex justify-center p-5 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
                <button onClick={() => setIsCompanyOpen(false)} type="button" className="inline-flex items-center bg-[#2C54E7] text-white px-8 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium shadow-md hover:shadow-lg">
                  <X className="w-4 h-4 mr-2" />
                  {t("common.close", "Close")}
                </button>
              </div>
            </div>
          </div>
        )}

        {isCandidateOpen && (
          <div className="fixed inset-0 z-[2000] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
            <div className="w-screen h-screen max-w-5xl mx-auto bg-white shadow-2xl flex flex-col rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-blue-100 to-indigo-100">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-700" />
                  {t("services.for_recrutiers.title")}
                </h3>
                <button
                  onClick={() => setIsCandidateOpen(false)}
                  className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md"
                  aria-label={t("common.close", "Close")}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow bg-gradient-to-b from-white to-gray-50">
                <div className="space-y-6 text-gray-700">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-md mb-6 transform hover:scale-[1.01] transition-all duration-300">
                    <h4 className="text-xl font-bold mb-3 text-blue-800 flex items-center">
                      <Info className="w-6 h-6 mr-2 text-blue-700" />
                      {candidateModalSections.paragraph_1_title || t("services.for_recrutiers.modal.paragraph_1_title")}
                    </h4>
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">{candidateModalSections.paragraph_1_content || t("services.for_recrutiers.modal.paragraph_1_content")}</p>
                  </div>
                  <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400 mb-6 shadow-md transform hover:scale-[1.01] transition-all duration-300">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed flex items-start">
                      <Shield className="w-5 h-5 mr-2 text-yellow-600 shrink-0 mt-1" />
                      {candidateModalSections.paragraph_2_confidentiality || t("services.for_recrutiers.modal.paragraph_2_confidentiality")}
                    </p>
                  </div>
                  
                  <ModalSection 
                    titleText={candidateModalSections.section_service_flow_title || t("services.for_recrutiers.modal.section_service_flow_title")}
                    contentText={candidateModalSections.section_service_flow_content || t("services.for_recrutiers.modal.section_service_flow_content")}
                    icon={Workflow}
                  />
                  <ModalSection 
                    titleText={candidateModalSections.section_career_europe_title || t("services.for_recrutiers.modal.section_career_europe_title")}
                    contentText={candidateModalSections.section_career_europe_content_1 || t("services.for_recrutiers.modal.section_career_europe_content_1")}
                    contentText2={candidateModalSections.section_career_europe_content_2 || t("services.for_recrutiers.modal.section_career_europe_content_2")}
                    icon={Globe2}
                  />
                  <ModalSection 
                    titleText={candidateModalSections.section_executive_jobs_title || t("services.for_recrutiers.modal.section_executive_jobs_title")}
                    contentText={candidateModalSections.section_executive_jobs_content || t("services.for_recrutiers.modal.section_executive_jobs_content")}
                    icon={Briefcase}
                  />
                  <ModalSection 
                    titleText={candidateModalSections.section_negotiation_title || t("services.for_recrutiers.modal.section_negotiation_title")}
                    contentText={candidateModalSections.section_negotiation_content || t("services.for_recrutiers.modal.section_negotiation_content")}
                    icon={DollarSign}
                  />
                  <ModalSection 
                    titleText={candidateModalSections.section_aftercare_title || t("services.for_recrutiers.modal.section_aftercare_title")}
                    contentText={candidateModalSections.section_aftercare_content || t("services.for_recrutiers.modal.section_aftercare_content")}
                    icon={HeartHandshake}
                  />
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border border-blue-200 shadow-md mt-8 text-center transform hover:scale-[1.01] transition-all duration-300">
                    <p className="font-semibold text-gray-800 whitespace-pre-line text-lg">
                      <HeartHandshake className="w-6 h-6 text-blue-700 inline-block mr-2 mb-1" />
                      {candidateModalSections.final_message || t("services.for_recrutiers.modal.final_message")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-5 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
                <button onClick={() => setIsCandidateOpen(false)} type="button" className="inline-flex items-center bg-[#2C54E7] text-white px-8 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium shadow-md hover:shadow-lg">
                  <X className="w-4 h-4 mr-2" />
                  {t("common.close", "Close")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
