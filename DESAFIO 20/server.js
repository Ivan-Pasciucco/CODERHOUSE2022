const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.default({ puerto: 8080, modo: "FORK" }).argv;
const cpus = require("os").cpus().length;
const cluster = require("cluster");
const PORT = process.env.PORT || 8080;

const chat = require("./services/chat");
const productos = require("./services/productos");

const router = require("./routes/router");

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", router);

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  socket.on("guardar", async (data) => {
    try {
      console.log(data);
      const products = await productos.readProducts();
      io.sockets.emit("historialGuardar", products);
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  });

  try {
    const products = await productos.readProducts();
    socket.emit("historialProductos", products);
  } catch (e) {
    console.log(`Ha ocurrido el siguiente error: ${e}`);
  }

  socket.on("nuevoMensaje", async (data) => {
    try {
      await chat.addMessage(data);
      const mensajes = await chat.readMessages();
      io.sockets.emit("historialGlobal", mensajes);
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  });
  try {
    const mensajes = await chat.readMessages();
    socket.emit("historialChat", mensajes);
  } catch (e) {
    console.log(`Ha ocurrido el siguiente error: ${e}`);
  }
});

if (args.modo === "CLUSTER" && cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  httpserver.listen(PORT, () => {
    console.log(`proceso ${process.pid} corriendo en el puerto ${PORT}`);
  });
  console.log(`worker ${process.pid} is running`);
}

module.exports = httpserver;
