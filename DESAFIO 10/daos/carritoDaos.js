const firebase = require("firebase-admin");
const FieldValue = firebase.firestore.FieldValue;
const config = require("./db/octavio-coderhouse-firebase-adminsdk-obkyu-3199223b90.json");
const Product = require("./productosDaos");

const product = new Product();

class Car {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(config),
    });
  }

  async createCar() {
    const db = firebase.firestore();
    const query = db.collection("carrito");

    try {
      const carrito = await query.get();
      const carritos = carrito.docs.map((doc) => ({
        id: doc.data().id,
      }));
      let idCar = 0;
      if (carritos.length !== 0) {
        const len = carritos.length - 1;
        idCar = carritos[len].id + 1;
      } else {
        idCar = 1;
      }
      const doc = query.doc(`${idCar}`);
      await doc.create({ id: idCar, timestamp: Date.now(), productos: [] });
      return "Carrito creado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async delCar(id) {
    const db = firebase.firestore();
    const query = db.collection("carrito");
    try {
      const doc = query.doc(id);
      await doc.delete();
      return "Carrito eliminado con exito";
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async listCar(id) {
    const db = firebase.firestore();
    const query = db.collection("carrito");
    try {
      const doc = query.doc(id);
      const carrito = await doc.get();
      return carrito.data();
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async addProdCar(idCar, idProduct) {
    const db = firebase.firestore();
    const query = db.collection("carrito");
    try {
      const carritoId = await this.listCar(`${idCar}`);
      let productoId = await product.getProdById(idProduct);
      if (carritoId !== undefined && productoId.length !== 0) {
        const carId = JSON.stringify(carritoId.id);
        const doc = query.doc(carId);
        const data = {
          idAsignacion: Date.now(),
          id: productoId.id,
          timestamp: productoId.timestamp,
          nombre: productoId.nombre,
          descripcion: productoId.descripcion,
          codigo: productoId.codigo,
          foto: productoId.foto,
          precio: productoId.precio,
          stock: productoId.stock,
        };
        await doc.update("productos", FieldValue.arrayUnion(data), {
          merge: true,
        });
        return `Producto agregado al carrito ${idCar} con exito`;
      } else {
        return "No existe el producto o el carrito";
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async deleteProdCar(idCar, idProduct) {
    const db = firebase.firestore();
    const query = db.collection("carrito");
    try {
      const carritoId = await this.listCar(`${idCar}`);
      if (carritoId !== undefined) {
        const productoId = carritoId.productos.find(
          (producto) => producto.id == idProduct
        );
        if (productoId !== undefined) {
          const doc = query.doc(`${carritoId.id}`);
          await doc.update("productos", FieldValue.arrayRemove(productoId));
          return `Producto eliminado del carrito ${idCar} con exito`;
        } else {
          return `No existe el producto que se desea eliminar`;
        }
      } else {
        return `No existe el carrito numero ${idCar}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
}

module.exports = Car;
