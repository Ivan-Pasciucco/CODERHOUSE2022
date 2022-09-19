const cartDao = require('../database/daos/cart.dao');

const carritoService = {
    verCarService : async (email) => {
            try{
                const data = await cartDao.verCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    delCarService : async (email) => {
            try{
                const data = await cartDao.delCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    listCarService : async (email) => {
            try{
                const data = await cartDao.listCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    addProdCarService : async (email, idProduct) => {
            try{
                const car = await cartDao.verCar(email);
                const data = await cartDao.addProdCar(email, idProduct);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    deleteProdCarService : async (email,id) => {
            try{
                const data = await cartDao.deleteProdCar(email, id);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    finCarService : async (nombre, email) => {
            try{
                await cartDao.carFin(nombre, email);
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = carritoService;