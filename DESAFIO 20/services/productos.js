const productosDAO = require("../database/DAO/productos");
const productosDTO = require('../database/DTO/productos')

const productos = {
  addProduct: async (producto) => {
    try {
      await productosDAO.addNewProduct(producto);
      console.log("Producto agregado con exito");
    } catch (e) {
      console.log(`Error al agregar producto: ${e}`);
    }
  },
  readProducts: async () => {
    try {
      const data = await productosDAO.getAllProducts();
      const datos = data.map(item =>{
        const dto = new productosDTO(item);
        return dto;
      })
      return datos;
    } catch (e) {
      console.log(`Error al leer productos: ${e}`);
    }
  },
};

module.exports = productos;
