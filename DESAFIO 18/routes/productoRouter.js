const express = require("express");
const router = express.Router();
const Producto = require("../controllers/products");
const producto = new Producto();
const log4js = require("../utils/logs");
const logConsole = log4js.getLogger("consola");
const logError = log4js.getLogger("error");

router.post("/", async (req, res) => {
  try {
    await producto.saveProduct(req.body);
    logConsole.info("producto guardado correctamente");
    res.redirect("/");
  } catch (e) {
    logError.error(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prodById = await producto.getProdById(req.params.id);
    res.send(prodById);
  } catch (e) {
    logError.error(e);
  }
});

module.exports = router;
