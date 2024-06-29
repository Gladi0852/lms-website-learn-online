const url = require("url");
const usersModel = require("../Model/Users");
const Users = usersModel.users;

exports.getLimitedTeacher = async (req, res) => {
  const teachersData = await Users.find({ role: "Teacher", profile: true })
    .sort({ totalContents: -1 })
    .limit(4)
    .select("name designation profile_photo");
  if (teachersData) res.status(200).json(teachersData);
  else res.send("Error");
};

exports.updateTotalContent = async (email, totalContent) => {
  await Users.updateOne({ email: email }, { totalContents: totalContent });
};

exports.getAllTeachers = async (req, res) => {
  const myURL = url.parse(req.url, true);
  const pageNumber = myURL.query.pageNumber;
  const lastIndex = pageNumber * 4;
  const firstIndex = lastIndex - 4;
  const teachersData = await Users.find({ profile: true, role: "Teacher" })
    .sort({ totalContents: -1 })
    .skip(firstIndex)
    .limit(4)
    .select("name designation profile_photo");
  if (teachersData) res.status(200).json(teachersData);
  else res.status(501).send("Error");
};

exports.totalTeachers = async (req, res) => {
  try {
    const totalNumber = await Users.countDocuments({
      profile: true,
      role: "Teacher",
    });
    res.status(200).json(totalNumber);
  } catch (error) {
    console.log("error");
    res.status(501).send(error.message);
  }
};
