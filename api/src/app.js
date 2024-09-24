const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const { auth } = require("./middleware/jwtAuth");
const connectDB = require("./config/db");
const initRoutes = require("./routes/initRoutes"); // Import initRoutes

const app = express();

// Verificar variables de entorno requeridas
if (
  !process.env.SESSION_SECRET ||
  !process.env.JWT_SECRET ||
  !process.env.MONGODB_URI
) {
  throw new Error("Faltan variables de entorno requeridas");
}

// Conectar a MongoDB
connectDB();

// Configurar middlewares
configure(app);

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS para permitir cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Permitir envío de cookies
  })
);

// Middleware para analizar cookies
app.use(cookieParser());

// Configurar sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Inicializar rutas desde initRoutes.js
initRoutes(app); // This will initialize the routes for /api/auth and /api/users

// Inicializar el manejador de errores
initErrorHandler(app);

module.exports = app;
