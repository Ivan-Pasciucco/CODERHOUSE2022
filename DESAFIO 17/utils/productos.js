const faker = require('faker');
faker.locale = 'es';

class Productos{

    constructor(){
    }
    
    RandomProducts() {
        let producto = {};
        const productos = [];
        for (let i = 0; i < 5; i++) {
            producto = {};
            producto.nombre = faker.commerce.product();
            producto.precio = faker.commerce.price(100, 10000, 2, '$');
            producto.foto = faker.image.image(50,50,true);
            productos.push(producto);
        }
        return productos;
    }

}

module.exports = Productos;