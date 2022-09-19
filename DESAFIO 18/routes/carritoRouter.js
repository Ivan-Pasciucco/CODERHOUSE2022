const express = require("express");
const router = express.Router();
const Carrito = require("../controllers/cart");
const carrito = new Carrito();
const { newOrderSms } = require("../utils/twilio");
const log4js = require("../utils/logs");
const logConsole = log4js.getLogger("consola");
const logError = log4js.getLogger("error");

router.get("/addCar", async (req, res) => {
  try {
    await carrito.createCar();
    logConsole.info("carrito creado con exito");
    res.redirect("/");
  } catch (e) {
    logError.error(e);
  }
});

router.get("/delCar", async (req, res) => {
  try {
    await carrito.delCar(1);
    logConsole.info("carrito eliminado con exito");
    res.redirect("/");
  } catch (e) {
    logError.error(e);
  }
});

router.get("/listCar", async (req, res) => {
  try {
    const car = await carrito.listCar(1);
    res.send({ car: car });
  } catch (e) {
    logError.error(e);
  }
});

router.get("/addProd/:idProduct", async (req, res) => {
  try {
    const car = await carrito.listCar(1);
    if (!car) {
      await carrito.createCar();
    }
    await carrito.addProdCar(1, req.params.idProduct);
    logConsole.info("Producto agregado al carrito con exito");
    res.redirect("/");
  } catch (e) {
    logError.error(e);
  }
});

router.get("/delProd/:id", async (req, res) => {
  try {
    await carrito.deleteProdCar(1, req.params.id);
    logConsole.info("Producto eliminado del carrito con exito");
    res.redirect("/");
  } catch (e) {
    logError.error(e);
  }
});

router.get("/finCar/:nombre/:email/:numtel", async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const email = req.params.email;
    const numTel = req.params.numtel;

    const resEmail = await carrito.carFin(nombre, email);
    const resSms = await newOrderSms(numTel);

    logConsole.info(resEmail);
    res.render("pages/pedidoExito");
  } catch (e) {
    logError.error(e);
  }
});

module.exports = router;
