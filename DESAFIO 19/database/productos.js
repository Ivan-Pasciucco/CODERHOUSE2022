const mongoose = require('mongoose');
const productoSchema = require('./models/productoSchema');
require('dotenv').config();

class Producto{
    
    constructor(){
        
    }

    async connectDB(){
        try{
            const URL = process.env.URLDB;
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }catch (e){
            console.log(e);
        }
    }
    
    async addNewProduct(producto){
        try{
            await this.connectDB();
            let lastId = await productoSchema.find().sort({id:-1}).limit(1);
            if(lastId.length !== 0){
                producto.id = lastId[0].id + 1;
            }else{
                producto.id = 1;
            }
            await productoSchema.create(producto);
            mongoose.disconnect();
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

    async getAllProducts(){
        try{
            await this.connectDB();
            const data = await productoSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

}

const productosDB = new Producto();

module.exports = productosDB;