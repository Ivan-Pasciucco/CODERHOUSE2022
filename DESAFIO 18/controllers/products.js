const mongoose = require("mongoose");
const productoSchema = require("../db/productoSchema");
const log4js = require("../utils/logs");
const logError = log4js.getLogger("error");
require("dotenv").config();

class Producto {
  constructor() {}

  async connectDB() {
    try {
      const URL = process.env.URLDB;
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      logError.error(e);
    }
  }

  async saveProduct(producto) {
    try {
      await this.connectDB();
      let lastId = await productoSchema.find().sort({ id: -1 }).limit(1);
      if (lastId.length !== 0) {
        producto.id = lastId[0].id + 1;
      } else {
        producto.id = 1;
      }
      producto.timestamp = Date.now();
      await productoSchema.create(producto);
      mongoose.disconnect();
      return "Producto guardado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getProducts() {
    try {
      await this.connectDB();
      const data = await productoSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getProdById(id) {
    try {
      await this.connectDB();
      const producto = await productoSchema.find({ id: id });
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
      const product = await productoSchema.find({ id: producto.id });
      if (product.length !== 0) {
        await productoSchema.updateOne(
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
      const product = await productoSchema.find({ id: id });
      if (product.length !== 0) {
        await productoSchema.deleteOne({ id: id });
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

module.exports = Producto;
