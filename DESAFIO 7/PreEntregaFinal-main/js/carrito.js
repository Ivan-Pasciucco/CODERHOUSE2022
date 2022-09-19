const fs = require('fs');
const Productos = require('./productos');
const productos = new Productos();

class Carrito{

    constructor(){
        this.path = './js/carrito.txt';
    }

    async addCart(){
        try{
            const car = await fs.promises.readFile(this.path,'utf-8');
            let carObj = JSON.parse(car);
            let carNew = [];
            if(carObj.length !== 0){
                let len = carObj.length - 1;
                let ultimoId = carObj[len].id;
                carObj.push({
                    id:ultimoId + 1,
                    timestamp:Date.now(),
                    productos:[]
                });
                carNew = JSON.stringify(carObj,null,2);
            }else{
                carNew.push({
                    id:1,
                    timestamp:Date.now(),
                    productos:[]
                });
                carNew = JSON.stringify(carNew,null,2);
            }
            try{
                await fs.promises.writeFile(this.path,carNew);
                return 'Carrito creado con exito';
            }catch (e){
                return 'Ha ocurrio el siguiente error: '+e;
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async deleteCart(id){
        try{
            const carritos = await fs.promises.readFile(this.path,'utf-8');
            let carritosObj = JSON.parse(carritos);
            const index = carritosObj.findIndex(i => i.id == id);
            if(index !== -1){
                carritosObj.splice(index,1);
                carritosObj = JSON.stringify(carritosObj,null,2);
                try{
                    await fs.promises.writeFile(this.path,carritosObj);
                    return 'Carrito eliminado correctamente';
                }catch (e){
                    return 'Ha ocurrido el siguiente error: '+e;
                }
            }else{
                return 'Carrito no encontrado';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async getCart(id){
        try{
            const carrito = await fs.promises.readFile(this.path, 'utf-8');
            if(carrito.length !== 0){
                const carritoObj = JSON.parse(carrito);
                const carritoId = carritoObj.find((carrito) => carrito.id == id);
                if(carritoId !== undefined){
                    return carritoId;
                }else{
                    return 'No existe carrito con ese id';
                }
            }else{
                return 'no hay carritos para mostrar';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async addProductCart(idCart,idProduct){
        try{
            const carts = await fs.promises.readFile(this.path,'utf-8');
            let cartsObj = JSON.parse(carts);
            const index = cartsObj.findIndex(i => i.id == idCart);
            const carritoId = await this.getCart(idCart);
            const productoId = await productos.listById(idProduct);
            if(index !== -1){
                if(typeof(productoId) !== 'string'){
                    cartsObj[index].productos.push(productoId);
                    cartsObj = JSON.stringify(cartsObj,null,2);
                    try{
                        await fs.promises.writeFile(this.path,cartsObj);
                        return `Producto agregado al carrito ${carritoId.id} correctamente`
                    }catch (e){
                        return 'Ha ocurrido el siguiente error: '+e;
                    }
                }else{
                    return 'No existe el producto que has intentado agregar';
                }
            }else{
                return 'El carrito al que intentas agregar productos no existe';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async deleteProductCart(idCart,idProduct){
        try{
            const carts = await fs.promises.readFile(this.path,'utf-8');
            let cartsObj = JSON.parse(carts);
            const index = cartsObj.findIndex(i => i.id == idCart);

            const carritoId = await this.getCart(idCart);
            const productoId = await productos.listById(idProduct);

            if(index !== -1){
                if(typeof(productoId) !== 'string'){
                    const indexProduct = cartsObj[index].productos.findIndex(i => i.id == idProduct);
                    cartsObj[index].productos.splice(indexProduct,1);
                    cartsObj = JSON.stringify(cartsObj,null,2);
                    try{
                        await fs.promises.writeFile(this.path,cartsObj);
                        return 'Producto eliminado del carrito correctamente';
                    }catch (e){
                        return 'Ha ocurrido el siguiente error: '+e;
                    }
                }else{
                    return 'No existe el producto que has intentado eliminar';
                }
            }else{
                return 'El carrito del que intentas eliminar productos no existe';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

}

module.exports = Carrito;