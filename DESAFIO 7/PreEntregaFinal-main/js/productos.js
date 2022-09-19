const fs = require('fs');

class Productos{

    constructor(){
        this.path = './js/productos.txt';
    }

    async listAll(){
        try{
            const productos = await fs.promises.readFile(this.path, 'utf-8');
            const productosObj = JSON.parse(productos);
            if(productosObj.length !== 0){
                return JSON.parse(productos);
            }else{
                return 'No hay productos para mostrar';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async listById(id){
        try{
            const producto = await fs.promises.readFile(this.path, 'utf-8');
            if(producto.length !== 0){
                const productoObj = JSON.parse(producto);
                const productoId = productoObj.find((producto) => producto.id == id);
                if(productoId !== undefined){
                    return productoId;
                }else{
                    return 'No existen productos con ese id'
                }
            }else{
                return 'no hay productos para mostrar';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async addProduct(producto){
        try{
            const product = await fs.promises.readFile(this.path,'utf-8');
            let productObj = JSON.parse(product);
            let productNew = [];
            producto.timestamp = Date.now().toString();
            if(productObj.length !== 0){
                let len = productObj.length - 1;
                let ultimoId = productObj[len].id;
                producto.id = ultimoId + 1;
                productObj.push(producto);
                productNew = JSON.stringify(productObj,null,2);
            }else{
                producto.id = 1;
                productNew.push(producto);
                productNew = JSON.stringify(productNew,null,2);
            }
            try{
                await fs.promises.writeFile(this.path,productNew);
                return 'Producto guardado con exito';
            }catch (e){
                return 'Ha ocurrio el siguiente error: '+e;
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async editProduct(producto){
        try{
            const product = await fs.promises.readFile(this.path,'utf-8');
            let productObj = JSON.parse(product);
            const index = productObj.findIndex(i => i.id == producto.id);
            producto.timestamp = Date.now().toString();
            if(index !== -1){
                productObj[index] = producto;
                productObj = JSON.stringify(productObj,null,2);
                try{
                    await fs.promises.writeFile(this.path,productObj);
                    return 'Producto actualizado correctamente'
                }catch (e){
                    return 'Ha ocurrido el siguiente error: '+e;
                }
            }else{
                return 'Producto no encontrado';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

    async deleteProduct(id){
        try{
            const productos = await fs.promises.readFile(this.path,'utf-8');
            let productosObj = JSON.parse(productos);
            const index = productosObj.findIndex(i => i.id == id);
            if(index !== -1){
                productosObj.splice(index,1);
                productosObj = JSON.stringify(productosObj,null,2);
                try{
                    await fs.promises.writeFile(this.path,productosObj);
                    return 'Producto eliminado correctamente';
                }catch (e){
                    return 'Ha ocurrido el siguiente error: '+e;
                }
            }else{
                return 'Producto no encontrado';
            }
        }catch (e){
            return 'La ruta es incorrecta o el archivo no existe';
        }
    }

}

module.exports = Productos;