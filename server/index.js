require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const searchRoutes = require("./routes/search")
const streamRoutes = require("./routes/videostream");
const subcontentRoutes = require("./routes/subcontent");
const userEnrollment = require("./routes/userEnrollment");
const searchEnrollment = require("./routes/searchEnrollment");
const getContentDetail = require("./routes/getContentDetail");
const bucket = require("./routes/UploadToBucket");
// const createContent = require("./routes/createContent");
// const updateContent = require("./routes/createContent");
// const deleteContent = require("./routes/createContent");
// const searchDisapproved = require("./routes/searchDisapproved");
const createContent = require("./routes/createContent");
const updateContent = require("./routes/createContent");
const deleteContent = require("./routes/createContent");
const searchDisapproved = require("./routes/searchDisapproved");
const enrollmentCount = require("./routes/userEnrollment");
const preferences = require("./routes/userPreferences");
const recommendations = require("./routes/recommendations");




// database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search",searchRoutes);
app.use("/api/videostream",streamRoutes);
app.use("/api/subcontent",subcontentRoutes);
app.use("/api/userEnrollment",userEnrollment);
app.use("/api/searchEnrollment",searchEnrollment);
app.use("/api/getContentDetail", getContentDetail);
app.use("/api/UploadToBucket",bucket);
app.use("/api/createContent",createContent);
app.use("/api/updateContent",updateContent);
app.use("/api/deleteContent",deleteContent);
app.use("/api/searchDisapproved", searchDisapproved);
app.use("/api/enrollmentCount", enrollmentCount);
app.use("/api/preferences", preferences);
app.use("/api/recommendations",recommendations);



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));