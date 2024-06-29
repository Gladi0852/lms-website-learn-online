const usersModel = require("../../Model/Users");
const bcrypt = require("bcrypt");
const Users = usersModel.users;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const util = require("util");
const { fetchEnrolledCourses } = require("../course");

require("dotenv").config();
const verifyTokenAsync = util.promisify(jwt.verify);

exports.addUser = async (req, res) => {
  try {
    const user = new Users(req.body);
    await user.save();
    res.status(201).send("User Registration Completed");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.findUser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await Users.findOne({ email: email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const privateKeyPath = path.join(__dirname, "../../private_key.key");
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "User not found" });
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      try {
        const privateKey = fs.readFileSync(privateKeyPath, "utf-8");
        const token = jwt.sign({ emailId: email }, privateKey, {
          algorithm: "RS256",
          expiresIn: process.env.JWT_EXPIRY,
        });

        return res.status(200).json({
          user,
          token: token,
        });
      } catch (jwtError) {
        console.error("JWT signing failed:", jwtError);
        return res.status(500).send({
          message: "Token generation failed",
          error: jwtError.message,
        });
      }
    } else {
      // If passwords do not match, send unauthorized response
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const user = await Users.findOne({ email: decoded.emailId }).select(
        "about email enrolled_course gender name phoneNumber profile_photo role designation"
      );
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

exports.updateBasicDetails = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    const emailId = decoded.emailId;
    try {
      const updateData = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNumber: req.body.phone_number,
        about: req.body.about,
      };
      if (req.body.role === "Teacher" && req.body.designation) {
        updateData.designation = req.body.designation;
      }
      await Users.findOneAndUpdate({ email: emailId }, updateData);
      res.status(200).json({
        message: "Profile updated successfully",
      });
    } catch (error) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  // console.log(req.file.filename);
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    const emailId = decoded.emailId;
    try {
      await Users.findOneAndUpdate(
        { email: emailId },
        {
          profile_photo: req.file.filename,
          profile: true,
        }
      );
      res.status(200).json({
        message: "Image updated successfully",
        photo: req.file.filename,
      });
    } catch (error) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

exports.changePassword = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    const emailId = decoded.emailId;
    try {
      const { currentPassword } = req.body;
      const user = await Users.findOne({ email: emailId });
      const isSame = await bcrypt.compare(currentPassword, user.password);
      if (isSame) {
        try {
          const { newPassword } = req.body;
          if (newPassword !== currentPassword) {
            user.password = newPassword;
            await user.save();
            res.status(200).send({ message: "Password updated successfully" });
          } else {
            return res.status(403).send({
              message: "Current Password and New Password Should not be Same",
            });
          }
        } catch (error) {
          res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
        }
      } else {
        return res.status(401).send({ message: "Invalid Current Password" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

exports.addCourseAsEnrolled = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const { courseID } = req.body;
      const user = await Users.findOne({ email: decoded.emailId });

      if (!user.enrolled_course.includes(courseID)) {
        user.enrolled_course.push(courseID);
        await user.save();
        return res
          .status(200)
          .send({ message: "You are enrolled to this course" });
      } else {
        return res.status(400).send({ message: "Course already enrolled" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

exports.fetchEnrolledCourses = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];
  const publicKeyPath = path.join(__dirname, "../../public_key.key");
  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
    const decoded = await verifyTokenAsync(token, publicKey, {
      algorithms: ["RS256"],
    });
    try {
      const coursesID = await Users.findOne({ email: decoded.emailId }).select(
        "enrolled_course"
      );
      if (!coursesID) {
        return res
          .status(404)
          .send({ message: "You are not enrolled in any courses!" });
      }
      const courses = await fetchEnrolledCourses(coursesID.enrolled_course);
      res.status(200).send(courses);
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};
