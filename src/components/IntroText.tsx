import { useTranslation } from "react-i18next";

const flags = [
  { country: "Belgium", flagUrl: "/img/bl_bag.png" },
  { country: "Netherlands", flagUrl: "/img/ne_bag.png" },
  { country: "UK", flagUrl: "/img/uk_bag.png" },
  { country: "Germany", flagUrl: "/img/de_bag.png" },
  { country: "Poland", flagUrl: "/img/pl_bag.png" },
  { country: "Czech Republic", flagUrl: "/img/cz_bag.png" },
  { country: "Slovakia", flagUrl: "/img/sl_bag.png" },
  { country: "France", flagUrl: "/img/fr_bag.png" },
  { country: "Ukraine", flagUrl: "/img/ukr_bag.png" },
];

const ServiceFlags = () => {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-16 bg-gray-50 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{t("intro.paragraph_1")}</h2>
        <p className="text-lg text-gray-600 mb-8">{t("intro.paragraph_6")}</p>
        <div className="flex justify-center gap-8 flex-wrap mb-10">
          {flags.map(({ country, flagUrl }) => (
            <div key={country} className="flex items-center justify-center p-4">
              <img src={flagUrl} alt={`${country} Flag`} className="w-16 h-16 rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
        <p className="text-base text-gray-700 max-w-3xl mx-auto">{t("intro.paragraph_7")}</p>
      </div>
    </section>
  );
};

export default ServiceFlags;
