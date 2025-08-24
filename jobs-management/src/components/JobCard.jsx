import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { useJobContext } from "../config/JobContext";

const JobCard = ({ logo, job }) => {
  const { getTimeAgo } = useJobContext();
  // maxSalary is monthly → show annual CTC in lakhs
  const salary = `${Math.round((job?.maxSalary * 12) / 100_000)} LPA`;

  return (
    <div className="w-[340px] h-[360px] rounded-xl shadow-md border border-gray-200 py-4 px-4 flex flex-col justify-between bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <img
          src={job.logo ? job.logo : logo}
          alt="company-logo"
          className="w-[56px] h-[56px]"
        />
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
          {getTimeAgo(job?.createdAt)}
        </span>
      </div>

      {/* Title & company */}
      <div>
        <h1 className="text-lg font-semibold mt-2">{job?.title}</h1>
        <h2 className="text-gray-600 mt-1">{job?.company}</h2>
      </div>

      <div className="flex justify-between text-gray-600 text-sm mt-3 gap-2">
        <span className="flex items-center gap-1">
          <PersonAddAltOutlinedIcon fontSize="small" />
          <p>
            {job?.minExp}–{job?.maxExp} yr Exp
          </p>
        </span>
        <span className="flex items-center gap-1">
          <HomeWorkOutlinedIcon fontSize="small" />
          <p>{job?.location}</p>
        </span>
        <span className="flex items-center gap-1">
          <LayersOutlinedIcon fontSize="small" />
          <p>{salary}</p>
        </span>
      </div>

      {/* Description */}
      <ul className="text-sm text-gray-500 mt-5 list-disc pl-4 space-y-1 overflow-y-auto">
        {job?.description
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line, idx) => (
            <li key={idx}>{line.trim()}</li>
          ))}
      </ul>

      <button
        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => window.open(job?.jobLink, "_blank")}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
