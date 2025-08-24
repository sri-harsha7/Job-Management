import { useState } from "react";

import { useJobContext } from "../config/JobContext";

const initialForm = {
  title: "",
  company: "",
  location: "",
  jobType: "",
  minSalary: "",
  maxSalary: "",
  deadline: "",
  minExp: "",
  maxExp: "",
  jobLink: "",
  description: "",
};

const jobTypes = ["Full Time", "Part Time", "Internship"];

const JobCreation = () => {
  const [formData, setFormData] = useState(initialForm);
  const { addJob, setShowJobPage } = useJobContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(formData); // add to context
    setShowJobPage(false); // close modal
    setFormData(initialForm); // reset form
  };
  const handleCancel = () => {
    setShowJobPage(false);
  };

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[848px]  space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Create Job Opening
        </h2>

        {/* Job Title & Company Name */}
        <div className="grid grid-cols-2 gap-4 pt-8">
          <div className="flex flex-col">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-2 my-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border rounded-lg p-2 my-2 w-full"
              required
            />
          </div>
        </div>

        {/* Location & Job Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-lg p-2 my-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border rounded-lg p-2 my-2 w-full"
              required
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary Range & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Salary Range (₹)</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="minSalary"
                placeholder="Min"
                value={formData.minSalary}
                onChange={handleChange}
                className="border rounded-lg p-2 my-2 w-full"
              />
              <input
                type="number"
                name="maxSalary"
                placeholder="Max"
                value={formData.maxSalary}
                onChange={handleChange}
                className="border rounded-lg p-2 my-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="border rounded-lg p-2 my-2 w-full"
              required
            />
          </div>
        </div>
        {/* YOE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Year of Experience</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="minExp"
                placeholder="Min "
                value={formData.minExp}
                onChange={handleChange}
                className="border rounded-lg p-2 my-2 w-full"
              />
              <input
                type="number"
                name="maxExp"
                placeholder="Max"
                value={formData.maxExp}
                onChange={handleChange}
                className="border rounded-lg p-2 my-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Job Link</label>
            <input
              type="text"
              name="link"
              value={formData.jobLink}
              onChange={handleCancel}
              className="border rounded-lg p-2 my-2 w-full"
            />
          </div>
        </div>

        {/* Description */}
        <label>Job Description</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-lg p-2 my-2 w-full"
          required
        />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="border px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-[#00AAFF] text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Publish »
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobCreation;
