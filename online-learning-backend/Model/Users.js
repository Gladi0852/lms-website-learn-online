const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const usersSchema = new Schema({
  name: { type: String, required: [true, "Name is Must"] },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid email address",
    },
  },
  password: { type: String, required: true, minLength: 8 },
  role: { type: String, required: true, enum: ["Student", "Teacher"] },
  gender: String,
  phoneNumber: String,
  about: { type: String, maxLength: 500 },
  profile_photo: String,
  profile: { type: Boolean, default: false },
  designation: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.role === "Teacher" && !value) return false;
        if (this.role !== "Teacher" && value) return false;
        return true;
      },
      message: (props) =>
        `${props.value} is invalid! Designation is required if role is 'Teacher' and must be null if role is not 'Teacher'.`,
    },
  },
  totalContents: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        if (this.role === "Teacher") return true;
        return value === 0;
      },
      message: "Only Teachers can have total contents",
    },
  },
  enrolled_course: [{ courseID: String }],
});

//hash password
usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      return next(err);
    }
  }
  next();
});

exports.users = mongoose.model("users", usersSchema);
