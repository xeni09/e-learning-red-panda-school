const HttpStatus = require("http-status-codes");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { AppError } = require("../config/config");
const Logger = require("../utils/Logger");

/**
 * Configura los middlewares de la aplicación.
 * @param {express.Application} app
 */
function configure(app) {
  // Middleware de express
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  // Analiza la cabecera Cookie y popula req.cookies con un objeto claveado por los nombres de las cookies.
  app.use(cookieParser());
  // Devuelve el middleware de compresión
  app.use(compression());
  // Habilita CORS
  app.use(cors());
  // Asegura las aplicaciones configurando varias cabeceras HTTP
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "http://localhost:3000"],
        // Permitir la carga de favicon
        connectSrc: ["'self'", "http://localhost:3000"],
        scriptSrc: ["'self'", "http://localhost:3000"],
        styleSrc: ["'self'", "http://localhost:3000"],
        fontSrc: ["'self'", "http://localhost:3000"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
}

/**
 * Inicializa el manejador de errores.
 * @param {express.Application} app
 */
function initErrorHandler(app) {
  // Middleware de manejo de errores
  app.use((err, req, res, next) => {
    Logger.error(err);
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
    next(err); // Llama a next para pasar el error a cualquier middleware adicional de manejo de errores
  });
}

module.exports = {
  configure,
  initErrorHandler,
};
