import { Award, Users2, Building2, Globe2, Briefcase, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Overview */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 text-center">
            {t("about.title")}
            <img alt="Recruitment Europe Logo" src="/logoblack-full.png" className="max-h-[1.15em] mx-auto mt-4" />
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{t("about.description")}</p>
        </div>

        {/* CEO Message */}
        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* CEO Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img src="/img/ceo.jpg" alt="CEO" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>

            {/* CEO Message Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("about.ceo_message.title")}</h3>
              <p className="text-gray-600 mb-2">{t("about.ceo_message.paragraph_1")}</p>
              <p className="text-gray-600 mb-2">{t("about.ceo_message.paragraph_2")}</p>
              <p className="text-gray-600 mb-2">{t("about.ceo_message.paragraph_3")}</p>
              <p className="text-gray-600">{t("about.ceo_message.paragraph_4")}</p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">{t("about.ceo_message.paragraph_5")}</p>
                <p className="text-gray-600">{t("about.ceo_message.paragraph_6")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Building2, value: "540+", label: t("about.icons.icon_1") },
            { icon: Globe2, value: "16+", label: t("about.icons.icon_2") },
            { icon: Users2, value: "30k+", label: t("about.icons.icon_3") },
            { icon: Award, value: "98%", label: t("about.icons.icon_4") },
          ].map(({ icon: Icon, value, label }, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:bg-gray-50 transition-colors duration-300">
              <Icon className="w-12 h-12 text-[#2C54E7] mx-auto mb-4 hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {/* CEO Background */}
        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg mb-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Professional Background */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("about.professional_background.title")}</h3>
              <ul className="space-y-4">
                {[
                  { company: t("about.professional_background.items.item_1.title"), role: t("about.professional_background.items.item_1.description") },
                  { company: t("about.professional_background.items.item_2.title"), role: t("about.professional_background.items.item_2.description") },
                  { company: t("about.professional_background.items.item_3.title"), role: t("about.professional_background.items.item_3.description") },
                  { company: t("about.professional_background.items.item_4.title"), role: t("about.professional_background.items.item_4.description") },
                  { company: t("about.professional_background.items.item_5.title"), role: t("about.professional_background.items.item_5.description") },
                ].map(({ company, role }, index) => (
                  <li key={index} className="flex items-start">
                    <Briefcase className="w-6 h-6 text-[#2C54E7] mt-1 mr-3 hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">{company}</p>
                      <p className="text-gray-600">{role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education & Leadership */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("about.education.title")}</h3>
              <ul className="space-y-4">
                {[
                  { institution: t("about.education.items.item_1.title"), degree: t("about.education.items.item_1.description") },
                  { institution: t("about.education.items.item_2.title"), degree: t("about.education.items.item_2.description") },
                ].map(({ institution, degree }, index) => (
                  <li key={index} className="flex items-start">
                    <GraduationCap className="w-6 h-6 text-[#2C54E7] mt-1 mr-3 hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">{institution}</p>
                      <p className="text-gray-600">{degree}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <p className="mb-2">{t("about.paragraph_1")}</p>
          <p className="mb-2">{t("about.paragraph_2")}</p>
          <p className="mb-2">{t("about.paragraph_3")}</p>
          <p className="mb-2">{t("about.paragraph_5")}</p>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-6"></h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">{t("about.contact.name")}</dt>
                  <dd className="text-gray-600">Recruitment Europe Ltd</dd>
                </div>
                <div>
                  <dt className="font-semibold">{t("about.contact.established")}</dt>
                  <dd className="text-gray-600">2009</dd>
                </div>
                <div>
                  <dt className="font-semibold">{t("about.contact.phone")}</dt>
                  <dd className="text-gray-600">
                    +48 662 77 11 00 (Poland)
                    <br />
                    +44 20 3286 1414 (UK)
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">{t("about.contact.email")}</dt>
                  <dd className="text-gray-600">info@recruit-europe.eu</dd>
                </div>
                <div>
                  <dt className="font-semibold">{t("about.contact.address")}</dt>
                  <dd className="text-gray-600">ul. Legnicka 17 lok 76 Wroclaw 53-671 Poland <br />Office 36, 88-90 Hatton Garden, Holborn, EC1N 8PG London UK</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
