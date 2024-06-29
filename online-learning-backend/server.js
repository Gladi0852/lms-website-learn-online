const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const courseRouter = require("./Routers/course");
const teacherRouter = require("./Routers/teacher");
const emailRouter = require("./Routers/SendEmail");
const authRouter = require("./Routers/authRouter");
const coursePublishRouter = require("./Routers/publishCourse");
const mongoose = require("mongoose");
const draftCourseRouter = require("./Routers/draftCourse");
const path = require("path");

require("dotenv").config();

const server = express();

//db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}

server.use(cors());
server.use(express.json());
server.use(express.static("public"));
server.use("/public", express.static(path.join(__dirname, "public")));

server.use("/course", courseRouter.router);
server.use("/draftCourses", draftCourseRouter.router);
server.use("/teacher", teacherRouter.router);
server.use("/api", emailRouter.router);
server.use("/auth", authRouter.router);
server.use("/publisCourse", coursePublishRouter.router);

server.listen(process.env.PORT_NUMBER, () => {
  try {
    console.log("Server Started");
  } catch (e) {
    console.log(e);
  }
});
