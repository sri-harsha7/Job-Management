const express = require("express");
const jobsRoute = require("./routes/jobsRoute");
const connectDb = require("./config/DB");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3000;
connectDb();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/jobs", jobsRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
