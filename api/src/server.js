const http = require("http");
const Logger = require("./utils/Logger");
const app = require("./app");

// Configurar puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Crear servidor HTTP
const server = http.createServer(app);

// Iniciar servidor
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Manejar eventos del servidor
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      Logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  Logger.info(`Listening on ${bind}`);
});
