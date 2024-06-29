const express = require("express");
const draftCourseController = require("../Controller/draftCourse");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "./public/CourseImages/");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "./public/CourseVideos/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .post("/", draftCourseController.addNewCourseAsDraft)
  .get("/fetchCourseById", draftCourseController.fetchCourseById)
  .get("/fetchCourses", draftCourseController.fetchCourses)
  .delete("/deleteCourse", draftCourseController.deleteCourse)
  .patch(
    "/updateCourse",
    upload.single("file"),
    draftCourseController.updateCourseDetails
  )
  .delete("/deleteCoursePhoto", draftCourseController.deleteCoursePhoto)
  .patch(
    "/updateLecture",
    upload.single("file"),
    draftCourseController.updateLectureDetails
  )
  .delete("/deleteLectureVideo", draftCourseController.deleteVideo)
  .delete("/deleteChapter", draftCourseController.deleteChapter);
exports.router = router;
