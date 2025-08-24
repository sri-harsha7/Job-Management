import React from "react";
import JobCard from "../components/JobCard";
import Logo from "../assets/logo.png";
import { useJobContext } from "../config/JobContext";

const JobList = () => {
  const { filteredJobs } = useJobContext();
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2 px-7 py-4">
        {filteredJobs.length ? (
          filteredJobs.map((job) => (
            <div key={job._id ?? job.id} className="mb-5">
              <JobCard logo={Logo} job={job} />
            </div>
          ))
        ) : (
          <p className="col-span-4 text-gray-500">
            No jobs match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;
