import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Briefcase, MapPin, Building } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// Define Job type for props validation (optional but good practice)
interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  id: number; // Add an ID for linking
}

const JobCard = memo(({ title, company, location, type, description, id }: Job) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {" "}
      {/* Added flex flex-col */}
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {" "}
        {/* Added mb-4 */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3> {/* Adjusted size */}
          <div className="flex items-center text-sm text-gray-600">
            {" "}
            {/* Adjusted size */}
            <Building className="w-4 h-4 mr-1.5" /> {/* Adjusted size/margin */}
            <span>{company}</span>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            {" "}
            {/* Adjusted size */}
            <MapPin className="w-4 h-4 mr-1.5" /> {/* Adjusted size/margin */}
            <span>{location}</span>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2C54E7]/10 text-[#2C54E7] whitespace-nowrap">
          {" "}
          {/* Adjusted size/padding */}
          {type}
        </span>
      </div>
      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p> {/* Added flex-grow */}
      {/* Action Button */}
      <Link
        to={`/jobs/${id}`} // Link to the specific job detail page
        className="mt-auto inline-flex items-center justify-center text-[#2C54E7] font-medium hover:text-white bg-[#2C54E7]/10 hover:bg-[#2C54E7] px-4 py-2 rounded-lg transition-colors text-sm" // Adjusted size/padding
      >
        {t("jobs.button")}
        <Briefcase className="w-4 h-4 ml-1.5" /> {/* Adjusted size/margin */}
      </Link>
    </div>
  );
});

const JobListings = () => {
  // Use the same job data structure as Jobs.tsx for consistency
  const [jobs, setJobs] = useState<Job[]>([]);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    axios.get("https://recruit-europe.net/api/jobs/active").then((response) => {
      const jobs = [];
      for (const data of response.data) {
        switch (i18n.language) {
          case "en":
            jobs.push({
              id: data.id,
              title: data.en_title,
              company: data.company.name,
              location: data.state.name,
              type: data.work_type.name,
              salary: data.salary,
              description: data.en_description,
              requirements: data.en_requirements.split("\n"),
              benefits: [],
            });
            break;
          case "ja":
            jobs.push({
              id: data.id,
              title: data.jp_title,
              company: data.company.name,
              location: data.state.name,
              type: data.work_type.name,
              salary: data.salary,
              description: data.jp_description,
              requirements: data.jp_requirements.split("\n"),
              benefits: [],
            });
            break;
          case "de":
            jobs.push({
              id: data.id,
              title: data.de_title,
              company: data.company.name,
              location: data.state.name,
              type: data.work_type.name,
              salary: data.salary,
              description: data.de_description,
              requirements: data.de_requirements.split("\n"),
              benefits: [],
            });
            break;
        }
      }
      setJobs(jobs);
    });
  }, []);

  return (
    <section id="jobs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("jobs.title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("jobs.description")}</p>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job: Job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* View All Button - Changed to Link */}
        <div className="text-center mt-12">
          <Link
            to="/jobs" // Link to the main jobs page
            className="inline-block bg-[#2C54E7] text-white px-8 py-3 rounded-lg hover:bg-[#2445c2] transition-colors font-medium"
          >
            {t("jobs.view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
