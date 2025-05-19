import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Building, Search, Euro, Clock } from "lucide-react";
import { debounce } from "../utils/debounce"; // Assuming you have or will create this utility
import axios from "axios";
import { useTranslation } from "react-i18next";

// Debounce utility function (create src/utils/debounce.ts if it doesn't exist)
// export const debounce = (func, wait) => {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobsData, setJobs] = useState<Job[]>([]);

  const { t, i18n } = useTranslation();

  // Debounce search input
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 300), // 300ms delay
    []
  );

  // Update actual search term when debounced term changes
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || job.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(jobsData.map((job) => job.location))]; // Get unique locations

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the displayed value immediately
    setDebouncedSearchTerm(e.target.value);
    // Trigger the debounced update for filtering
    debouncedSetSearch(e.target.value);
  };

  return (
    <section className="pt-24 pb-20 bg-white">
      {" "}
      {/* Added pt-24 to account for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("jobs_page.title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("jobs_page.description")}</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("jobs_page.select.placeholder")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C54E7] focus:border-transparent"
                value={debouncedSearchTerm} // Use debounced value for display
                onChange={handleSearchChange}
              />
            </div>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C54E7] focus:border-transparent" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">{t("jobs_page.select.view_all")}</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Link to={`/jobs/${job.id}`} className="group">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#2C54E7] transition-colors">{job.title}</h3>
                    </Link>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Euro className="w-4 h-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2C54E7]/10 text-[#2C54E7]">
                      <Clock className="w-4 h-4 mr-2" />
                      {job.type}
                    </span>
                    <Link to={`/jobs/${job.id}`} className="inline-flex items-center justify-center px-6 py-2 border border-[#2C54E7] text-[#2C54E7] rounded-lg hover:bg-[#2C54E7] hover:text-white transition-colors">
                      {t("jobs_page.details")}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No jobs found matching your criteria.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export default Jobs;
