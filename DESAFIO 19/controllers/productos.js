const products = require("../services/productos");

const productos = {
  newProduct: (req, res) => {
    products.addProduct(req.body);
  },
};

module.exports = productos;
