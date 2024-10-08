const Course = require("../models/Course");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Obtener secciones de un curso
const getCourseSections = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course.sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Agregar una nueva sección
const addCourseSection = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, videoUrl } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let sectionImage = null;
    if (req.file) {
      const resizedImagePath = `/uploads/resized_${req.file.filename}`;
      await sharp(req.file.path)
        .resize(300, 200)
        .toFile(
          path.join(
            __dirname,
            "../../public/uploads",
            `resized_${req.file.filename}`
          )
        );
      fs.unlinkSync(req.file.path);
      sectionImage = resizedImagePath;
    }

    const newSection = { title, description, videoUrl, sectionImage };
    course.sections.push(newSection);
    await course.save();
    const createdSection = course.sections[course.sections.length - 1];
    res.status(201).json(createdSection);
  } catch (error) {
    console.error("Error adding section:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Actualizar una sección
const updateCourseSection = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const { title, description, videoUrl } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // Actualiza los campos de la sección
    section.title = title || section.title;
    section.description = description || section.description;
    section.videoUrl = videoUrl || section.videoUrl;

    // Si hay un archivo de imagen, actualiza el sectionImage
    if (req.file) {
      const resizedImagePath = `/uploads/resized_${req.file.filename}`;
      await sharp(req.file.path)
        .resize(300, 200)
        .toFile(
          path.join(
            __dirname,
            "../../public/uploads",
            `resized_${req.file.filename}`
          )
        );
      fs.unlinkSync(req.file.path);
      section.sectionImage = resizedImagePath;
    }

    await course.save();
    res.status(200).json(section);
  } catch (error) {
    console.error("Error updating section:", error.message);
    res
      .status(500)
      .json({ message: "Error updating section", error: error.message });
  }
};

// Eliminar una sección
const deleteCourseSection = async (req, res) => {
  const { courseId, sectionId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    course.sections.pull({ _id: sectionId });
    await course.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting section", error: error.message });
  }
};

// Obtener una sección específica de un curso
const getSectionById = async (req, res) => {
  const { courseId, sectionId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const section = course.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    console.error("Error fetching section:", error);
    res.status(500).json({ message: "Error fetching section", error });
  }
};

module.exports = {
  getCourseSections,
  addCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getSectionById,
};
