import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface Country {
  id: number;
  en_name: string;
}
interface City {
  id: number;
  name: string;
}

const EmployerForm: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    axios
      .post("https://recruit-europe.net/api/landing/companies", data)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "We have received your data, we will contact you soon.",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Ops!",
          text: "An error has occurred, please try again.",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    axios.get("https://recruit-europe.net/api/countries").then((response) => {
      setCountries(response.data);
    });
  }, []);

  function update(e: React.FormEvent<HTMLSelectElement>) {
    axios.get("https://recruit-europe.net/api/states/" + e.currentTarget.value).then((response) => {
      setCities(response.data);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="overflow-auto max-h-[calc(100vh-15rem)]">
        <div>
          <label htmlFor="employer-name" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.name")}
          </label>
          <input type="text" id="employer-name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm" placeholder="Contact Person's Name" />
        </div>
        <div>
          <label htmlFor="employer-email" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.email")}
          </label>
          <input type="email" id="employer-email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm" placeholder="work.email@company.com" />
        </div>
        <div>
          <label htmlFor="employer-phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.phone")}
          </label>
          <input type="tel" id="employer-phone" name="phone" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm" placeholder="+12 345 678 90" />
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.industry")}
          </label>
          <input type="text" id="industry" name="industry" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm" placeholder="Industry" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.country")}
          </label>
          <select id="country" onChange={update} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm">
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.en_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.state")}
          </label>
          <select required id="state" onChange={update} name="state_id" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm">
            {cities.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="employer-areas" className="block text-sm font-medium text-gray-700 mb-1">
            {t("navbar.company_form.areas")}
          </label>
          <textarea name="description" id="employer-areas" rows={3} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2C54E7] focus:border-[#2C54E7] sm:text-sm" placeholder="e.g., Software Engineering, Project Management, Marketing..." />
        </div>
        <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2C54E7] hover:bg-[#2445c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C54E7]">
          {t("navbar.company_form.submit")}
        </button>
      </div>
    </form>
  );
};

export default EmployerForm;
