const draftCourseModel = require("../Model/UnpublishedContents");
const DraftCourses = draftCourseModel.unpublishedCourses;
const courseController = require("../Controller/course");
const deleteCourse = courseController.deleteCourse;
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const util = require("util");
const updateTotal = require("./auth/UsersAuth");

const verifyTokenAsync = util.promisify(jwt.verify);

exports.addNewCourseAsDraft = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    const emailId = decoded.emailId;
    try {
      const { title, category } = req.body;
      const newCourse = new DraftCourses({
        email: emailId,
        course_name: title,
        category: category,
      });
      const response = await newCourse.save();
      res.status(200).send({
        message: "Course saved as draft",
        id: response._id.toString(),
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send({
          message:
            "You already created a course with the same name. Edit or delete that first",
        });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.fetchCourseById = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const response = await DraftCourses.findById(id);
      res.status(200).json(response);
    } catch (error) {
      return res.status(404).send({ message: "Invalid" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.fetchCourses = async (req, res) => {
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
      const response = await DraftCourses.find({ email: email }).sort({
        updatedAt: -1,
      });
      res.status(200).json(response);
    } catch (error) {
      return res.status(404).send({ message: "Invalid" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.deleteCourse = async (req, res) => {
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
      await DraftCourses.findByIdAndDelete(id);
      const response = await deleteCourse(id);
      if (response === 200) {
        const totalContents = await DraftCourses.find({
          email: email,
        }).countDocuments();
        updateTotal.updateTotalContent(email, totalContents);
      }
      res.status(200).send({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.updateCourseDetails = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const { field, value } = req.body;
      const course = await DraftCourses.findById(id);
      if (!course) {
        return res.status(404).send({ message: "Course not found" });
      }
      if (req.file) {
        course[field] = req.file.filename;
      } else if (field && value) {
        course[field] = value;
      }
      await course.save();
      res.status(200).send({ message: "Course updated successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.deleteCoursePhoto = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const { course_image } = req.body;
      const course = await DraftCourses.findById(id);
      if (!course) {
        return res.status(404).send({ message: "Course not found" });
      }
      course["course_image"] = "";
      const imagePath = path.join(
        __dirname,
        "../public/CourseImages/",
        course_image
      );
      fs.unlink(imagePath, async (err) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error deleting the image file" });
        }

        course.course_image = "";
        await course.save();
        res.status(200).send({ message: "Course updated successfully" });
      });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};
exports.updateLectureDetails = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");

  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const { field, value, lectureId } = req.body;
      const course = await DraftCourses.findById(id);
      if (!course) {
        return res.status(404).send({ message: "Course not found" });
      }
      if (lectureId) {
        let lecture = course.course_lectures.find(
          (lec) => lec._id.toString() === lectureId
        );
        if (req.file) {
          lecture[field] = req.file.filename;
        } else if (value !== undefined) {
          lecture[field] = value;
        }
        if (lecture.lecture_name && lecture.lecture_desc)
          lecture["lecture_status"] = true;
        else lecture["lecture_status"] = false;
      } else {
        const existingLecture = course.course_lectures.find(
          (lec) => lec.lecture_name === value
        );
        if (existingLecture) {
          return res
            .status(400)
            .send({ message: "Lecture name already exists in this course" });
        } else {
          course.course_lectures.push({
            lecture_name: value,
          });
        }
      }
      const response = await course.save();
      res.status(200).send({
        courseInfo: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.deleteVideo = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");

  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const { lectureId, lecture_video } = req.body;
      const course = await DraftCourses.findById(id);
      if (!course) {
        return res.status(404).send({ message: "Course not found" });
      }
      if (lectureId) {
        let lecture = course.course_lectures.find(
          (lec) => lec._id.toString() === lectureId
        );

        const videoPath = path.join(
          __dirname,
          "../public/CourseVideos/",
          lecture_video
        );
        fs.unlink(videoPath, async (err) => {
          if (err) {
            return res
              .status(500)
              .send({ message: "Error deleting the video file" });
          }
          lecture.lecture_video = "";
          await course.save();
        });
      }

      res.status(200).send({
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};

exports.deleteChapter = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { id } = req.query;
      const { lectureId } = req.body;
      const response = await DraftCourses.updateOne(
        { _id: id },
        { $pull: { course_lectures: { _id: lectureId } } }
      );
      res.status(200).send({ data: response });
    } catch (error) {
      console.error("Error deleting chapter:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log("error");
    res.status(401).send({ message: "Unauthorized: Invalid User" });
  }
};
