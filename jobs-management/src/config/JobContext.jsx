import { createContext, useContext, useMemo, useState, useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_URL;

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [showJobPage, setShowJobPage] = useState(false);

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${URL}/jobs`);
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json(); // ← convert body to JSON array
      setJobs(data);
    } catch (err) {
      console.error("GET /jobs failed →", err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* filter state (per-month rupees) */
  const [filters, setFilters] = useState({
    searchText: "",
    location: "",
    jobType: "",
    salaryRange: [5_000, 300_000], // 5 K – 300k
  });

  const addJob = async (raw) => {
    /* convert yearly numbers coming from the form */
    const payload = {
      ...raw,
      minSalary: Number(raw.minSalary) / 12,
      maxSalary: Number(raw.maxSalary) / 12,
    };

    try {
      const res = await fetch(`${URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      const saved = await res.json();
      setJobs((prev) => [...prev, saved]);
    } catch (err) {
      console.error("POST /jobs →", err.message);
      alert("Could not publish job. See console for details.");
    }
  };
  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "New";

    const now = new Date();
    const created = new Date(createdAt); // Convert ISO string to Date object
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return "Just now";
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays === 1) {
      return "1 day ago";
    } else {
      return `${diffDays} days ago`;
    }
  };

  /* -------- filter logic (memoised) -------- */
  const filteredJobs = useMemo(() => {
    const { searchText, location, jobType, salaryRange } = filters;
    const [min, max] = salaryRange;

    return jobs.filter((j) => {
      const textOk =
        !searchText.trim() ||
        j.title.toLowerCase().includes(searchText.toLowerCase()) ||
        j.company.toLowerCase().includes(searchText.toLowerCase());

      const locOk =
        !location.trim() ||
        j.location.toLowerCase().includes(location.toLowerCase());

      const typeOk = !jobType || j.jobType === jobType;

      const salaryOk = j.maxSalary >= min && j.minSalary <= max;

      return textOk && locOk && typeOk && salaryOk;
    });
  }, [jobs, filters]);

  return (
    <JobContext.Provider
      value={{
        showJobPage,
        setShowJobPage,
        jobs,
        addJob,
        filters,
        setFilters,
        filteredJobs,
        getTimeAgo,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useJobContext = () => useContext(JobContext);
