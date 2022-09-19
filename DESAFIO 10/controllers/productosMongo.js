const { productosDaos: Product } = require("../daos/indexDaos");
const product = new Product();

class Productos {
  constructor() {}

  async addProduct(producto) {
    try {
      return await product.saveProduct(producto);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async listAll() {
    try {
      const productos = await product.getProducts();
      if (productos.length !== 0) {
        return productos;
      } else {
        return "No hay productos para mostrar";
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async listById(id) {
    try {
      const producto = await product.getProdById(id);
      if (producto !== undefined) {
        return producto;
      } else {
        return `No existen productos con el id ${id}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async editProduct(producto) {
    try {
      return await product.editProd(producto);
    } catch (e) {
      return "Producto no encontrado";
    }
  }

  async deleteProduct(id) {
    try {
      return await product.delProd(id);
    } catch (e) {
      return "Producto no encontrado";
    }
  }
}

module.exports = Productos;
