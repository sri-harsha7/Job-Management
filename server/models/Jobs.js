const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract", "Internship"],
      required: true,
    },

    /* ----- salary per month (₹) ----- */
    minSalary: {
      type: Number,
      required: true,
      min: 5000,
    },
    maxSalary: {
      type: Number,
      required: true,
      max: 300000,
    },

    /* ----- experience (years) ----- */
    minExp: {
      type: Number,
      required: true,
      min: 0,
    },
    maxExp: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ----- other fields ----- */
    jobLink: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },

    /* logo can be a URL or base-64 string;
       for file uploads use { data: Buffer, contentType: String } */
    logo: {
      type: String,
      default: "",
    },

    /* auto time-stamp */
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Job", jobSchema);
