const mongoose = require("mongoose");
const productosSchema = require("../models/productosSchema");

class Product {
  constructor() {}
  async connectDB() {
    try {
      const URL =
        "mongodb+srv://ipasciucco:39603426@cluster0.1lcuy.mongodb.net/ecommerce?retryWrites=true&w=majority";
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async saveProduct(producto) {
    try {
      await this.connectDB();
      let lastId = await productosSchema.find().sort({ id: -1 }).limit(1);
      if (lastId.length !== 0) {
        producto.id = lastId[0].id + 1;
      } else {
        producto.id = 1;
      }
      producto.timestamp = Date.now();
      await productosSchema.create(producto);
      mongoose.disconnect();
      return "Producto guardado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
  async getProducts() {
    try {
      await this.connectDB();
      const data = await productosSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getProdById(id) {
    try {
      await this.connectDB();
      const producto = await productosSchema.find({ id: id });
      mongoose.disconnect();
      return producto[0];
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
  async editProd(producto) {
    try {
      await this.connectDB();
      producto.timestamp = Date.now().toString();
      const product = await productosSchema.find({ id: producto.id });
      if (product.length !== 0) {
        await productosSchema.updateOne(
          { id: producto.id },
          {
            $set: {
              timestamp: producto.timestamp,
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              codigo: producto.codigo,
              foto: producto.foto,
              precio: producto.precio,
              stock: producto.stock,
            },
          }
        );
        mongoose.disconnect();
        return "Producto actualizado con exito";
      } else {
        mongoose.disconnect();
        return `No existe el producto con id ${producto.id}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async delProd(id) {
    try {
      await this.connectDB();
      const product = await productosSchema.find({ id: id });
      if (product.length !== 0) {
        await productosSchema.deleteOne({ id: id });
        mongoose.disconnect();
        return "Producto eliminado con exito";
      } else {
        mongoose.disconnect();
        return `No existe el producto con id ${id}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
}

module.exports = Product;
