require("module-alias/register");
const http = require("http");
const app = require("./app");
const Logger = require("./utils/Logger");

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

/**
 * Binds and listens for connections on the specified host
 */
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/**
 * Server Events
 */
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
