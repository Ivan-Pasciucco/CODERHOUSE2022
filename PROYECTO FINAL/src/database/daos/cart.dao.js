const mongoose = require("mongoose");
const cartSchema = require("../models/Cart");
const product = require("./product.dao");
const { newOrder } = require("../../utils/nodemailer");
require("dotenv").config();

class Car {
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

  async verCar(email) {
    try {
      await this.connectDB();
      const carrito = await cartSchema.find({ email: email });
      await mongoose.disconnect();
      if (carrito.length !== 0) {
        return carrito;
      } else {
        const fyh = new Date();
        const car = {
          email: email,
          fyh: `${fyh.getDate()}/${
            fyh.getMonth() + 1
          }/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`,
          dirEntrega: "",
          productos: [],
        };
        await this.connectDB();
        await cartSchema.create(car);
        await mongoose.disconnect();
        return car;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async delCar(email) {
    try {
      await this.connectDB();
      const car = await cartSchema.find({ email: email });
      if (car.length !== 0) {
        await cartSchema.deleteOne({ email: email });
        mongoose.disconnect();
        return "Carrito eliminado con exito";
      } else {
        mongoose.disconnect();
        return `No existe un carrito del usuario ${email}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async listCar(email) {
    try {
      await this.connectDB();
      const carrito = await cartSchema.find({ email: email });
      mongoose.disconnect();
      return carrito[0];
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async addProdCar(email, idProduct) {
    try {
      await this.connectDB();
      let carrito = await this.listCar(email);
      let productoId = await product.getProdById(parseInt(idProduct));
      mongoose.disconnect();

      if (carrito && productoId) {
        await this.connectDB();
        productoId.timestamp = Date.now();
        const fyh = new Date();
        await cartSchema.updateOne(
          { email: email },
          {
            $push: {
              productos: productoId,
            },
          },
          {
            $set: {
              fyh: `${fyh.getDate()}/${
                fyh.getMonth() + 1
              }/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`,
            },
          }
        );
        mongoose.disconnect();
        return `Producto agregado al carrito del usuario ${email} con exito`;
      } else {
        return "No existe el producto o el carrito";
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async deleteProdCar(email, id) {
    try {
      await this.connectDB();
      let carrito = await this.listCar(email);
      mongoose.disconnect();

      if (carrito.length !== 0) {
        const producto = carrito.productos.find(
          (producto) => producto.id == id
        );
        if (producto) {
          await this.connectDB();
          await cartSchema.updateOne(
            { email: email },
            {
              $pull: {
                productos: { id: producto.id },
              },
            }
          );
          mongoose.disconnect();
          return `Producto eliminado del carrito del usuario ${email} con exito`;
        } else {
          return `No existe el producto que se desea eliminar`;
        }
      } else {
        return `No existe el carrito del usuario ${email}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async carFin(nombre, email) {
    try {
      const carrito = await this.listCar(email);
      await newOrder(nombre, email, carrito);
      await this.delCar(email);
      return "Pedido realizado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
}

const car = new Car();

module.exports = car;
