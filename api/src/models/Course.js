const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  sectionImage: {
    type: String,
    required: false,
  },
});

const CourseSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageSrc: {
    type: String,
    default: "https://via.placeholder.com/150",
    required: true,
  },
  sections: [SectionSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
