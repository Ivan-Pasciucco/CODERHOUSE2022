class ProductoDto{

    constructor(datos){
        this.title = datos.title;
        this.price = datos.price;
        this.thumbnail = datos.thumbnail;
    }
}

module.exports = ProductoDto;