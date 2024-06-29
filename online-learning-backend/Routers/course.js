const express = require("express");
const courseController = require("../Controller/course");

const router = express.Router();

router
  .get("/", courseController.getAllCourse)
  .get("/fetchCourse", courseController.fetchCourse)
  .get("/category", courseController.getSortedCategory)
  .get("/getlimited", courseController.getLimitedCourse)
  .get("/getAllCategory", courseController.getAllCategory);
exports.router = router;
