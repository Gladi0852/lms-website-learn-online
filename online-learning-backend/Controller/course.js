const url = require("url");
const courseModel = require("../Model/Course");
const categoryTemplate = require("../Local Data/CategoryTemplate.json");
const Courses = courseModel.courses;
const userModel = require("../Model/Users");
const Users = userModel.users;

exports.getAllCourse = async (req, res) => {
  const myURL = url.parse(req.url, true);
  let price = 1;
  if (myURL.query.price === "All") price = null;
  else if (myURL.query.price === "Free") price = 0;
  let coursesData;
  if (myURL.query.category === "All" && price === null) {
    coursesData = await Courses.find().sort({ updatedAt: -1 });
  } else if (myURL.query.category !== "All" && price === null) {
    coursesData = await Courses.find({ category: myURL.query.category }).sort({
      updatedAt: -1,
    });
  } else if (myURL.query.category !== "All" && price === 0) {
    coursesData = await Courses.find({
      $and: [{ category: myURL.query.category }, { price: price }],
    }).sort({
      updatedAt: -1,
    });
  } else if (myURL.query.category === "All" && price === 0) {
    coursesData = await Courses.find({
      price: price,
    }).sort({
      updatedAt: -1,
    });
  } else if (myURL.query.category === "All" && price === 1) {
    coursesData = await Courses.find({
      price: { $gte: price },
    }).sort({
      updatedAt: -1,
    });
  } else if (myURL.query.category !== "All" && price === 1) {
    coursesData = await Courses.find({
      $and: [{ category: myURL.query.category }, { price: { $gte: price } }],
    }).sort({
      updatedAt: -1,
    });
  }

  res.status(200).json(coursesData);
};

exports.getSortedCategory = async (req, res) => {
  for (let data of categoryTemplate) {
    data.totalContents = await Courses.countDocuments({
      category: data.category,
    });
  }
  const sortedCategory = categoryTemplate.sort(
    (a, b) => b.totalContents - a.totalContents
  );
  res.status(200).json(sortedCategory);
};

exports.getLimitedCourse = async (req, res) => {
  const courseData = await Courses.find().sort({ updatedAt: -1 }).limit(4);
  if (courseData) res.status(200).json(courseData);
  else res.send("Error");
};

exports.getAllCategory = (req, res) => {
  const categories = categoryTemplate.map((item) => item.category);
  res.status(200).json(categories);
};

exports.deleteCourse = async (courseId) => {
  try {
    const course = await Courses.findByIdAndDelete(courseId);
    if (!course) {
      return 404;
    }
    return 200;
  } catch (error) {
    console.log(error);
  }
};

exports.fetchCourse = async (req, res) => {
  try {
    const { courseID } = req.query;
    const courseResponse = await Courses.findById(courseID).select(
      "email course_name category course_desc course_image course_lectures price"
    );
    if (!courseResponse) {
      return res.status(404).send({ message: "Course not found" });
    }
    const email = courseResponse.email;
    const userInfoResponse = await Users.findOne({ email: email }).select(
      "name about designation profile_photo"
    );
    const courseInfo = {
      email: courseResponse.email,
      course_name: courseResponse.course_name,
      category: courseResponse.category,
      course_desc: courseResponse.course_desc,
      course_image: courseResponse.course_image,
      course_lectures: courseResponse.course_lectures,
      price: courseResponse.price,
    };
    const userInfo = {
      name: userInfoResponse.name,
      about: userInfoResponse.about,
      designation: userInfoResponse.designation,
      profile_photo: userInfoResponse.profile_photo,
    };
    const combinedInfo = {
      ...courseInfo,
      ...userInfo,
    };
    res.status(200).send(combinedInfo);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
  }
};

exports.fetchEnrolledCourses = async (coursesID) => {
  const courses = await Courses.find({ _id: { $in: coursesID } }).sort({
    updatedAt: -1,
  });
  return courses;
};
