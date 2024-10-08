const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getCourseSections,
  addCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getSectionById,
} = require("../controllers/courseSectionController");
const { auth, authorize } = require("../middleware/jwtAuth");

// Configuración de multer para almacenar imágenes de secciones
const sectionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads/sections")); // Guardar las imágenes de secciones en /public/uploads/sections
  },
  filename: (req, file, cb) => {
    const filename = `section-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

// Usa `sectionStorage` para la configuración de multer
const sectionUpload = multer({ storage: sectionStorage });

// Rutas para crear secciones
router.get(
  "/:courseId/sections",
  auth,
  authorize(["admin"]),
  getCourseSections
);

// Agregar una nueva sección con subida de imagen
router.post(
  "/:courseId/sections",
  auth,
  authorize(["admin"]),
  sectionUpload.single("sectionImage"), // Usa sectionUpload aquí
  addCourseSection
);

// Ruta para eliminar una sección de un curso
router.delete(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  deleteCourseSection
);

// Ruta para obtener una sección específica de un curso
router.get(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  getSectionById
);

// Actualizar una sección existente
router.put(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  sectionUpload.single("sectionImage"), // Usa multer para la subida de la imagen
  updateCourseSection
);

// Ruta para subir la imagen de la sección
router.post(
  "/:courseId/sections/upload-image",
  sectionUpload.single("sectionImage"),
  async (req, res) => {
    try {
      const filename = req.file.filename;
      const imageUrl = `/uploads/sections/${filename}`;

      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading section image:", error);
      res.status(500).send("Error uploading section image");
    }
  }
);

module.exports = router;
