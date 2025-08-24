const Job = require("../models/Jobs");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
};

const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};

module.exports = { getAllJobs, createJob };
