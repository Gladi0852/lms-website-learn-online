const express = require("express");
const multer = require("multer");
const usersController = require("../Controller/auth/UsersAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/UploadedImages/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router
  .post("/signup/add", usersController.addUser)
  .get("/signup/find", usersController.findUser)
  .post("/login", usersController.loginUser)
  .get("/verifyToken", usersController.verifyToken)
  .patch("/basic-details", usersController.updateBasicDetails)
  .post(
    "/upload-profile-photo",
    upload.single("image"),
    usersController.uploadProfilePhoto
  )
  .post("/change-password", usersController.changePassword)
  .patch("/addCourseAsEnrolled", usersController.addCourseAsEnrolled)
  .get("/fetchEnrolledCourse", usersController.fetchEnrolledCourses);

exports.router = router;
