const mongoose = require("mongoose");
const chatSchema = require("../models/Chat");
require("dotenv").config();

class Chat {
  constructor() {}

  async connectDB() {
    try {
      const URL = process.env.URLDB;
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async addMessage(mensaje) {
    try {
      await this.connectDB();
      await chatSchema.create(mensaje);
      mongoose.disconnect();
      return "Mensaje guardado con exito";
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async readMessages() {
    try {
      await this.connectDB();
      const data = await chatSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }
}

const chat = new Chat();

module.exports = chat;
