const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const teacherSchema = new Schema({
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
  profile_photo: { type: String },
  gender: { type: String },
  phone_number: { type: Number },
  designation: String,
  about: [{ type: String, minLen: 100 }],
  totalContents: { type: Number, default: 0 },
  profile: { type: Boolean, default: false },
});

// Middleware to hash the password before saving
teacherSchema.pre("save", async function (next) {
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

exports.teachers = mongoose.model("teachers", teacherSchema);
