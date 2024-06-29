const express = require("express");
const teacherController = require("../Controller/teacher");

const router = express.Router();
router
  .get("/", teacherController.getAllTeachers)
  .get("/getlimited", teacherController.getLimitedTeacher)
  .get("/total", teacherController.totalTeachers);

exports.router = router;
