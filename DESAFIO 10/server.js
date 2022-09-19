const express = require("express");
const app = express();

const productosRouter = require("./routes/productosRouter");
const carritoRouter = require("./routes/carritoRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

const server = app.listen(8080, () => {
  console.log("Servidor levantado");
});
