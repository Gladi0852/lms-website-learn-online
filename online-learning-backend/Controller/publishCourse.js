const draftCoursesModel = require("../Model/UnpublishedContents");
const coursesModel = require("../Model/Course");

const DraftCourses = draftCoursesModel.unpublishedCourses;
const Courses = coursesModel.courses;

const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const util = require("util");
const updateTotal = require("./teacher");

const verifyTokenAsync = util.promisify(jwt.verify);

exports.publishCourse = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    const email = decoded.emailId;
    try {
      const { id } = req.query;
      const course = await DraftCourses.findById(id);
      if (!course)
        return res.status(404).send({ message: "Draft course not found" });
      const existingCourse = await Courses.findOne({ _id: course._id });
      if (!existingCourse) {
        course.status = true;
        await course.save();

        const totalContents = await DraftCourses.find({
          email: email,
        }).countDocuments();
        updateTotal.updateTotalContent(email, totalContents);

        const newCourse = new Courses({
          ...course.toObject(),
          _id: course._id,
        });
        await newCourse.save();
        res.status(200).send({ message: "Course published successfully" });
      } else {
        const draftCourseData = course.toObject();
        delete draftCourseData._id; // Remove _id to avoid issues with update

        // Check if there are differences
        const isDifferent = Object.keys(draftCourseData).some((key) => {
          return draftCourseData[key] !== existingCourse[key];
        });
        if (isDifferent) {
          await Courses.updateOne({ _id: course._id }, draftCourseData);
          return res
            .status(200)
            .send({ message: "Course updated successfully" });
        } else {
          return res.status(400).send({ message: "No changes to publish" });
        }
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};
