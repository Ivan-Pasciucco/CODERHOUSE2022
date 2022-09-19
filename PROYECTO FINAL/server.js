// Importaciones
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const router = require("./src/routes/routes");
const passport = require("passport");
const session = require("./src/middlewares/session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./src/utils/passport");

//Inicializacion
const PORT = process.env.PORT || 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const chat = require("./src/services/chat.services");

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("src/public"));
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

io.on("connection", async (socket) => {
  socket.on("probando", (data) => {
    console.log(data);
  });

  socket.on("nuevoMensaje", async (data) => {
    try {
      await chat.newMesService(data);
      const mensajes = await chat.getMesService();
      io.sockets.emit("historialGlobal", mensajes);
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  });
  try {
    const mensajes = await chat.getMesService();
    socket.emit("historialChat", mensajes);
  } catch (e) {
    console.log(`Ha ocurrido el siguiente error: ${e}`);
  }
});

//inicio de servidor

httpserver.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
