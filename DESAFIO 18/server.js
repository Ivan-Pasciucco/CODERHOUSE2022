const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const cpus = require("os").cpus().length;
const cluster = require("cluster");
const log4js = require("./utils/logs");
const logConsole = log4js.getLogger("consola");
const logWarn = log4js.getLogger("warn");
const logError = log4js.getLogger("error");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

const Chat = require("./controllers/chat");
const chat = new Chat();

const Producto = require("./controllers/products");
const producto = new Producto();

const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const infoRouter = require("./routes/infoRouter");
const productoRouter = require("./routes/productoRouter");
const carritoRouter = require("./routes/carritoRouter");

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/info", infoRouter);
app.use("/producto", productoRouter);
app.use("/carrito", carritoRouter);
app.use((req, res, next) => {
  logWarn.warn(`Ruta ${req.url} método ${req.method} no implementados`);
  res
    .status(404)
    .json({
      error: 404,
      descripcion: `Ruta ${req.url} método ${req.method} no implementados`,
    });
});

io.on("connection", async (socket) => {

  socket.on("nuevoMensaje", async (data) => {
    try {
      await chat.addMessage(data);
      const mensajes = await chat.readMessages();
      io.sockets.emit("historialGlobal", mensajes);
    } catch (e) {
      logError.error(`Ha ocurrido el siguiente error: ${e}`);
    }
  });
  try {
    const mensajes = await chat.readMessages();
    socket.emit("historialChat", mensajes);
  } catch (e) {
    logError.error(`Ha ocurrido el siguiente error: ${e}`);
  }
});

if (process.env.MODOSERVER === "CLUSTER" && cluster.isPrimary) {
  logConsole.info(`Master ${process.pid} is running`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    logConsole.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  httpserver.listen(PORT, () => {
    logConsole.info(`proceso ${process.pid} corriendo en el puerto ${PORT}`);
  });
}
