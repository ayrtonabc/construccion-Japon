import { Award, Users2, Building2, Globe2, Briefcase, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Overview */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Recruit Europe</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Leading recruitment services across Europe since 2009, connecting Japanese and German companies with exceptional talent.</p>
        </div>

        {/* CEO Message */}
        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* CEO Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="CEO" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>

            {/* CEO Message Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">CEO's Message</h3>
              <p className="text-gray-600 mb-4">In today's increasingly competitive economic environment, securing talented personnel quickly and efficiently, ahead of competitors, is becoming a crucial factor in establishing a competitive advantage between companies.</p>
              <p className="text-gray-600">We utilize our global network and are industry pioneers in implementing cutting-edge IT systems, including our "Intelligent Assessment System," "Full Automation CV Scan System," and "AI recruitment system," enabling 24/7 candidate searches.</p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">Takeshige Yokota</p>
                <p className="text-gray-600">CEO, Recruit Europe</p>
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
        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Professional Background */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Professional Background</h3>
              <ul className="space-y-4">
                {[
                  { company: "Subaru (Former Fuji Heavy Industries)", role: "Automotive Division Sales, Boxer Engine Production Planning" },
                  { company: "Kienbaum", role: "Germany's Leading Headhunting Company" },
                  { company: "Pasona UK", role: "Director" },
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
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Education & Leadership</h3>
              <ul className="space-y-4">
                {[
                  { institution: "Chuo University", degree: "Master's in Policy Studies" },
                  { institution: "Warsaw School of Economics", degree: "Doctorate" },
                  { institution: "Japanese Chamber of Commerce (Wroclaw)", role: "Chairman (2010-2020)" },
                ].map(({ institution, degree, role }, index) => (
                  <li key={index} className="flex items-start">
                    <GraduationCap className="w-6 h-6 text-[#2C54E7] mt-1 mr-3 hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">{institution}</p>
                      <p className="text-gray-600">{degree || role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Company Information</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">Company Name</dt>
                  <dd className="text-gray-600">Recruit Europe Sp.zo.o.</dd>
                </div>
                <div>
                  <dt className="font-semibold">Established</dt>
                  <dd className="text-gray-600">2009</dd>
                </div>
                <div>
                  <dt className="font-semibold">Phone</dt>
                  <dd className="text-gray-600">+48 662 77 11 00</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">Email</dt>
                  <dd className="text-gray-600">info@recruit-europe.eu</dd>
                </div>
                <div>
                  <dt className="font-semibold">Address</dt>
                  <dd className="text-gray-600">ul. Legnicka 17 lok 76 Wroclaw 53-671 Poland</dd>
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
