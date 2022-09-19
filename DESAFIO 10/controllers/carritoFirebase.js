const { carritoDaos: Car } = require("../daos/indexDaos");
const car = new Car();

class Carrito {
  constructor() {}

  async addCar() {
    try {
      return await car.createCar();
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async deleteCar(id) {
    try {
      return await car.delCar(id);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async getCar(id) {
    try {
      const carrito = await car.listCar(id);
      if (carrito !== undefined) {
        return carrito;
      } else {
        return `No existe carrito con el id ${id}`;
      }
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async addProductCar(idCar, idProduct) {
    try {
      return await car.addProdCar(idCar, idProduct);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }

  async deleteProductCar(idCar, idProduct) {
    try {
      return await car.deleteProdCar(idCar, idProduct);
    } catch (e) {
      return `Ha ocurrido el siguiente error: ${e}`;
    }
  }
}

module.exports = Carrito;
