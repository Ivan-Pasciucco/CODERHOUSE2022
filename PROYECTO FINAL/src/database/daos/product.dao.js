const mongoose = require("mongoose");
const productSchema = require("../models/Product");
const fs = require("fs").promises;
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
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async saveProduct(producto, file) {
    try {
      await this.connectDB();
      let lastId = await productSchema.find().sort({ id: -1 }).limit(1);
      if (lastId.length !== 0) {
        producto.id = lastId[0].id + 1;
      } else {
        producto.id = 1;
      }
      producto.foto = "img/" + file.filename;
      await productSchema.create(producto);
      mongoose.disconnect();
      return "Producto guardado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getProducts() {
    try {
      await this.connectDB();
      const data = await productSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getProdById(id) {
    try {
      await this.connectDB();
      const producto = await productSchema.find({ id: id });
      mongoose.disconnect();
      return producto[0];
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async editProd(producto, file) {
    try {
      await this.connectDB();
      const product = await productSchema.find({ id: producto.idProduct });
      if (product.length !== 0) {
        const prod = {
          descripcion: producto.descripcion,
          precio: producto.precio,
          categoria: producto.categoria,
        };
        if (file) {
          try {
            await fs.unlink("src/public/" + product[0].foto);
          } catch (e) {
            console.log(e);
          }
          prod.foto = "img/" + file.filename;
        }
        await productSchema.updateOne(
          { id: producto.idProduct },
          { $set: prod }
        );
        mongoose.disconnect();
        console.log("Producto actualizado con exito");
      } else {
        mongoose.disconnect();
        console.log(`No existe el producto con id ${producto.id}`);
      }
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async delProd(id) {
    try {
      await this.connectDB();
      const product = await productSchema.find({ id: id });
      await fs.unlink("src/public/" + product[0].foto);
      if (product.length !== 0) {
        await productSchema.deleteOne({ id: id });
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

  async findByCat(filtro) {
    try {
      await this.connectDB();
      const data = await productSchema.find({ categoria: filtro });
      mongoose.disconnect();
      return data;
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
}

const productoDao = new Producto();

module.exports = productoDao;
