// Bring down packages installed
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// initialize a express app
const app = express();

// Configure middlewares
app.use(cors());
// - ensure that express can read json
app.use(express.json());

// routes - This is where your entry point file i.e index maps the route/endpoint
app.use("/api/auth", authRoutes);

const url = process.env.MONGODB_URL;

const options = {
  serverSelectionTimeoutMS: 30000, // BufferMS
};

//Mongo db connection
mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Mongo Db Error:", error);
  });

// start node js server
const PORT = process.env.PORT || 0;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
