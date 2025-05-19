import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const JobSeekerForm: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    axios
      .post("https://recruit-europe.net/api/apply", data)
      .then(() => {
        setLoading(false);
        setError("Your data has been sent successfully.");
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
  };

  const [fileName, setFileName] = useState("");

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      // Rellena el input oculto
      const input = document.getElementById("cv-upload") as HTMLInputElement | null;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="overflow-auto max-h-[calc(100vh-15rem)]">
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
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-1">
            {t("job_page.upload_cv")}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#2C54E7] hover:text-[#2445c2] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#2C54E7]">
                  <span>{t("job_page.upload_file")}</span>
                  <input id="cv-upload" name="resume_url" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </label>
                <p className="pl-1">{t("job_page.drag_and_drop")}</p>
              </div>
              {fileName ? <p className="text-xs text-gray-500 mt-1">{fileName}</p> : <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>}
            </div>
          </div>
        </div>
      </div>
      <p className="text-red-600 text-center">{error}</p>
      <button type="submit" disabled={loading} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2C54E7] hover:bg-[#2445c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C54E7]">
        {t("job_page.submit")}
      </button>
    </form>
  );
};

export default JobSeekerForm;
