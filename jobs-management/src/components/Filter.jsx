import { Slider } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { jobTypes } from "../utils/jobList";
import { useJobContext } from "../config/JobContext";

const Filter = () => {
  const {
    filters: { searchText, location, jobType, salaryRange },
    setFilters,
  } = useJobContext();

  const update = (field) => (val) =>
    setFilters((f) => ({ ...f, [field]: val }));

  return (
    <div className="grid grid-cols-4 text-[16px] text-[#686868] px-2 py-4 m-4 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">
      <div className="border-r-1 border-gray-300 flex items-center gap-3 px-8">
        <SearchOutlinedIcon sx={{ width: 20, height: 20 }} />
        <input
          value={searchText}
          onChange={(e) => update("searchText")(e.target.value)}
          placeholder="Search by title or company"
          className="flex-1 outline-none"
        />
      </div>

      {/* ───── location ───── */}
      <div className="border-r-1 border-gray-300 flex items-center gap-3 px-8">
        <LocationOnOutlinedIcon sx={{ width: 20, height: 20 }} />
        <input
          value={location}
          onChange={(e) => update("location")(e.target.value)}
          placeholder="Location"
          className="flex-1 outline-none"
        />
      </div>

      <div className="border-r-1 border-gray-300 flex items-center gap-3 px-8">
        <RecordVoiceOverOutlinedIcon sx={{ width: 20, height: 20 }} />
        <select
          value={jobType}
          onChange={(e) => update("jobType")(e.target.value)}
          className="flex p-1 w-3/4"
        >
          <option value="" className="w-3/4">
            Job Type
          </option>
          {jobTypes.map((jt) => (
            <option key={jt} className="w-3/4">
              {jt}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col px-8">
        <div className="flex justify-between font-semibold mb-2">
          <span>Salary / month</span>
          <span>
            ₹{salaryRange[0] / 1_000}k – ₹{salaryRange[1] / 1_000}k
          </span>
        </div>

        <Slider
          value={salaryRange}
          onChange={(_, v) => update("salaryRange")(v)}
          step={5_000}
          min={5_000}
          max={300_000}
        />
      </div>
    </div>
  );
};

export default Filter;
