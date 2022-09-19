const cartService = require("../services/cart.services");

const cartController = {
  verifyCart: async (req, res) => {
    try {
      const data = await cartService.verCarService(req.params.email);
      res.send(data);
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
  delCart: async (req, res) => {
    try {
      const data = await cartService.delCarService(req.params.email);
      res.redirect("/");
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
  listCart: async (req, res) => {
    try {
      const data = await cartService.listCarService(req.params.email);
      return data;
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
  addProdCart: async (req, res) => {
    try {
      const data = await cartService.addProdCarService(
        req.params.email,
        req.params.idProduct
      );
      res.redirect("/");
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
  delProdCart: async (req, res) => {
    try {
      const data = await cartService.deleteProdCarService(
        req.params.email,
        req.params.id
      );
      res.redirect("/");
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
  findCart: async (req, res) => {
    try {
      const nombre = req.params.nombre;
      const email = req.params.email;
      await cartService.finCarService(nombre, email);
      res.render("pages/pedidoExito");
    } catch (e) {
      throw new Error(`Ocurrio un error${e}`);
    }
  },
};

module.exports = cartController;
