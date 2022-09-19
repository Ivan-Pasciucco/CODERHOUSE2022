const productoDao = require('../database/daos/product.dao');

const productService = {
    addProductService : async (product,file) => {
            try{
                const data = await productoDao.saveProduct(product,file);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getProductsService : async () => {
            try{
                const data = await productoDao.getProducts();
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getProdByIdService : async (idProduct) => {
            try{
                const data = await productoDao.getProdById(idProduct);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    updateProductService : async (producto, file) => {
            try{
                const data = await productoDao.editProd(producto, file);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    deleteProductService : async (id) => {
            try{
                const data = await productoDao.delProd(id);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    findByCategoryService : async (filtro) => {
            try{
                let data;
                if(filtro == 'all'){
                    data = await productoDao.getProducts();
                    return data;
                }else{
                    data = await productoDao.findByCat(filtro);
                    return data;
                }
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
    }

module.exports = productService;