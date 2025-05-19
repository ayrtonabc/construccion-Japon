import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Building2, Users2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    axios
      .post("https://recruit-europe.net/api/send-message", formData)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "We have received your message, we will contact you soon.",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("contact_form.title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("contact_form.text")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact_form.offices")}</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#2C54E7] mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold">{t("contact_form.address")}</h4>
                    <p className="text-gray-600">ul. Legnicka 17 lok 76</p>
                    <p className="text-gray-600">Wroclaw 53-671</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-[#2C54E7] mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold">{t("contact_form.phone")}</h4>
                    <p className="text-gray-600">+48 662 77 11 00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#2C54E7] mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold">{t("contact_form.email")}</h4>
                    <p className="text-gray-600">info@recruit-europe.eu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#2C54E7]/5 p-6 rounded-xl text-center">
                <Building2 className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-gray-900">9</h4>
                <p className="text-gray-600">European Countries</p>
              </div>
              <div className="bg-[#2C54E7]/5 p-6 rounded-xl text-center">
                <Users2 className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-gray-900">15+</h4>
                <p className="text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact_form.send_message")}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact_form.name")}
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact_form.email_address")}
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact_form.company")}
                </label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact_form.message")}
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required></textarea>
              </div>

              <button type="submit" className="w-full bg-[#2C54E7] text-white px-6 py-3 rounded-md hover:bg-[#2445c2] transition-colors font-medium">
                {t("contact_form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
