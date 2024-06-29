const express = require("express");
const router = express.Router();

const publishCourseController = require("../Controller/publishCourse");

router.put("/", publishCourseController.publishCourse);

exports.router = router;
