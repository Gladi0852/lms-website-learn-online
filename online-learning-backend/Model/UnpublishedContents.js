const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema({
  lecture_name: { type: String, required: true },
  lecture_desc: { type: String, default: "" },
  lecture_status: { type: Boolean, default: false },
  lecture_video: { type: String, default: "" },
});
const unpublishedContents = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email address",
      },
    },
    course_name: { type: String, required: [true, "Must Enter Course Name"] },
    category: { type: String, required: [true, "Must Enter category Name"] },
    status: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    course_desc: { type: String, maxLength: 300, default: "" },
    course_image: String,
    course_lectures: [lectureSchema],
  },
  { timestamps: true }
);

unpublishedContents.index({ email: 1, course_name: 1 }, { unique: true });

exports.unpublishedCourses = mongoose.model(
  "unpublishedCourses",
  unpublishedContents
);
