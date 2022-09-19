const mongoose = require('mongoose');
const mensajeSchema = require('./models/mensajeSchema');
require('dotenv').config();

class Chat{
    
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
    
    async addNewMessage(mensaje){
        try{
            await this.connectDB();
            await mensajeSchema.create(mensaje);
            mongoose.disconnect();
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
    
    async getAllMessages(){
        try{
            await this.connectDB();
            const data = await mensajeSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

}

const chatDB = new Chat();

module.exports = chatDB;