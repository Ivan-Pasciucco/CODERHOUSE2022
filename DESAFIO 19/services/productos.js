const productosDB = require("../database/productos");

const productos = {
  addProduct: async (producto) => {
    try {
      await productosDB.addNewProduct(producto);
      console.log("Producto agregado con exito");
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  },
  readProducts: async () => {
    try {
      const data = await productosDB.getAllProducts();
      return data;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  },
};

module.exports = productos;
