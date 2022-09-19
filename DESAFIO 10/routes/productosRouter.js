const express = require("express");
const router = express.Router();
const Productos = require("../controllers/productosMongo");
const productos = new Productos();

const admin = true;

router.post(
  "/",
  (req, res, next) => {
    if (admin === true) {
      next();
    } else {
      res.send("Lo sentimos, no tienes permisos para la ruta /api/productos");
    }
  },
  async (req, res) => {
    try {
      const respuesta = await productos.addProduct(req.body);
      res.send(respuesta);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const data = await productos.listAll();
    res.send(data);
  } catch (e) {
    return `Ha ocurrido el siguiente error: ${e}`;
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      res.send("ERROR: Por favor ingrese un numero");
    } else {
      const data = await productos.listById(req.params.id);
      res.send(data);
    }
  } catch (e) {
    return `Ha ocurrido el siguiente error: ${e}`;
  }
});

router.put(
  "/",
  (req, res, next) => {
    if (admin === true) {
      next();
    } else {
      res.send('Lo sentimos, no tienes permisos para la ruta /api/productos"');
    }
  },
  async (req, res) => {
    try {
      const respuesta = await productos.editProduct(req.body);
      res.send(respuesta);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
);

router.delete(
  "/:id",
  (req, res, next) => {
    if (admin === true) {
      next();
    } else {
      res.send('Lo sentimos, no tienes permisos para la ruta /api/productos"');
    }
  },
  async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        res.send("ERROR: Por favor ingrese un numero");
      } else {
        const respuesta = await productos.deleteProduct(req.params.id);
        res.send(respuesta);
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
);

module.exports = router;
