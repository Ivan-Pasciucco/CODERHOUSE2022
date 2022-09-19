const express = require("express");
const productosRouter = require("./routes/productos");
const hbs = require("express-handlebars");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/pages",
    partialsDir: __dirname + "/views/partials",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("pages/index", { mensaje: "" });
});

app.use("/productos", productosRouter);

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${server.address().port}`);
});
server.on("error", (error) => console.log(error));
