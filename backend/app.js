const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const { mongourl } = require("./keys");
require("./models/post.js");
require("./models/model.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Route handlers
app.use(require("./routes/createPost.js"));
app.use(require("./routes/auth.js"));

mongoose.connect(mongourl);

mongoose.connection.on("connected", () => {
  console.log("Connected To MongoDB Successfully.");
});

mongoose.connection.on("error", () => {
  console.log("Not Connected To MongoDB.");
});

app.listen(PORT, () => {
  console.log("Server is Running on " + PORT);
});
