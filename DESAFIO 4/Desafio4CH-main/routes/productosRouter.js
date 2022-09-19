const express = require("express");
const productosRouter = express.Router();

const productos = [];

productosRouter.get("/", (req, res) => {
  const productosStr = JSON.stringify(productos, null, 2);
  res.type("json");
  productos.length === 0
    ? res.json({ Mensaje: "No hay productos para mostrar" })
    : res.send(productosStr);
});

productosRouter.get("/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.json({ "error": "Por favor ingrese un numero" });
  } else {
    const productoById = productos.findIndex((i) => i.id == req.params.id);
    const productosStr = JSON.stringify(productos[productoById], null, 2);
    res.type("json");
    productoById !== -1
      ? res.send(productosStr)
      : res.json({ "error": "Producto no encontrado" });
  }
});

productosRouter.post("/", (req, res) => {
  let lastItem = productos.length - 1;
  lastItem = productos[lastItem];
  if (lastItem == undefined) {
    req.body.id = 1;
    productos.push(req.body);
  } else {
    const id = lastItem.id + 1;
    req.body.id = id;
    productos.push(req.body);
  }

  const productosStr = JSON.stringify(req.body, null, 2);
  res.type("json");
  res.send(`Mensaje: Producto agregado correctamente 
${productosStr}`);
});

productosRouter.put("/", (req, res) => {
  const index = productos.findIndex((i) => i.id == req.body.id);
  if (index !== -1) {
    productos[index] = req.body;
    res.json({
      Mensaje: "Producto actualizado correctamente",
      producto: productos[index],
    });
  } else {
    res.json({
      "error": "No se pudo actualizar, producto no encontrado",
    });
  }
});

productosRouter.delete("/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.json({ "error": "Por favor ingrese un numero" });
  } else {
    const index = productos.findIndex((i) => i.id == req.params.id);
    if (index !== -1) {
      productos.splice(index, 1);
      res.json({ Mensaje: "Producto eliminado correctamente" });
    } else {
      res.json({
        "error": "No se pudo eliminar, producto no encontrado",
      });
    }
  }
});

module.exports = productosRouter;
