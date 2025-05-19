import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Building, Euro, Clock, CheckCircle, X } from "lucide-react";
import axios from "axios";
import { Job } from "./Jobs";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const { t, i18n } = useTranslation();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    axios.get("https://recruit-europe.net/api/jobs/details/" + id).then((response) => {
      const data = response.data;
      let job;
      switch (i18n.language) {
        case "en":
          job = {
            id: data.id,
            title: data.en_title,
            company: data.company.name,
            location: data.state.name,
            type: data.work_type.name,
            salary: data.salary,
            description: data.en_description,
            requirements: data.en_requirements.split("\n"),
            benefits: data.en_benefits.split("\n"),
          };
          break;
        case "ja":
          job = {
            id: data.id,
            title: data.jp_title,
            company: data.company.name,
            location: data.state.name,
            type: data.work_type.name,
            salary: data.salary,
            description: data.jp_description,
            requirements: data.jp_requirements.split("\n"),
            benefits: data.jp_benefits.split("\n"),
          };
          break;
        case "de":
          job = {
            id: data.id,
            title: data.de_title,
            company: data.company.name,
            location: data.state.name,
            type: data.work_type.name,
            salary: data.salary,
            description: data.de_description,
            requirements: data.de_requirements.split("\n"),
            benefits: data.de_benefits.split("\n"),
          };
          break;
      }
      if (job != undefined) {
        setJob(job);
      }
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  if (!job) {
    return (
      <div className="pt-24 pb-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("job_id", id || "");
    setLoading(true);
    axios
      .post("https://recruit-europe.net/api/apply", data)
      .then(() => {
        setShowApplicationForm(false);
        setLoading(false);
        Swal.fire({
          title: "Good job!",
          text: "We have received your application, you will receive an update on the process via email.",
          icon: "success",
        });
      })
      .catch((e) => {
        setLoading(false);
        if (e.response) {
          if (e.response.status === 422) {
            setError(e.response.data.message);
          } else {
            setError("Unkown error");
          }
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
    // Handle form submission here
  };

  return (
    <section className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Job Header */}
        <div className="mb-12">
          <button onClick={() => navigate("/jobs")} className="text-[#2C54E7] mb-6 hover:underline flex items-center">
            ← {t("job_page.back")}
          </button>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Euro className="w-5 h-5 mr-2" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2C54E7]/10 text-[#2C54E7]">
                  <Clock className="w-4 h-4 mr-2" />
                  {job.type}
                </span>
                <button onClick={() => setShowApplicationForm(true)} className="mt-4 md:mt-0 bg-[#2C54E7] text-white px-6 py-3 rounded-lg hover:bg-[#2445c2] transition-colors">
                  {t("job_page.apply_now")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("job_page.job_description")}</h2>
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("job_page.requirements")}</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2C54E7] mr-3 mt-0.5" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("job_page.responsibilities")}</h2>
              <ul className="space-y-3">
                {job.requirements.map((resp, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2C54E7] mr-3 mt-0.5" />
                    <span className="text-gray-600">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("job_page.benefits")}</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#2C54E7] mr-3 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("job_page.about")} {job.company}
              </h3>
              <p className="text-gray-600 mb-4">We are a leading Japanese company expanding our operations across Europe. Our mission is to create innovative solutions while fostering a collaborative and inclusive work environment.</p>
              <button onClick={() => setShowApplicationForm(true)} className="w-full bg-[#2C54E7] text-white px-6 py-3 rounded-lg hover:bg-[#2445c2] transition-colors">
                {t("job_page.apply_now")}
              </button>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("job_page.apply_for")} {job.title}
                </h2>
                <button onClick={() => setShowApplicationForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.first_name")}
                  </label>
                  <input type="text" id="first_name" name="first_name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.last_name")}
                  </label>
                  <input type="text" id="last_name" name="last_name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.email_address")}
                  </label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.phone")}
                  </label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.experience")}
                  </label>
                  <input type="num" id="experience" name="experience" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.skills")}
                  </label>
                  <textarea id="skills" name="skills" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required></textarea>
                </div>

                <div>
                  <label htmlFor="resume_url" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.cv")}
                  </label>
                  <input type="file" id="resume_url" name="resume_url" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="desired_salary" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.desired_salary")}
                  </label>
                  <input type="num" id="desired_salary" name="desired_salary" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.availability")}
                  </label>
                  <input type="date" id="availability" name="availability" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.linkedin")}
                  </label>
                  <input type="url" id="linkedin" name="linkedin" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.portfolio")}
                  </label>
                  <input type="url" id="portfolio" name="portfolio" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("job_page.message")}
                  </label>
                  <textarea id="notes" name="notes" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2C54E7] focus:border-[#2C54E7]" required></textarea>
                </div>

                <p className="text-red-600 text-center">{error}</p>
                <button type="submit" disabled={loading} className="w-full disabled:opacity-40 bg-[#2C54E7] text-white px-6 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium">
                  {t("job_page.submit_application")}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetail;
