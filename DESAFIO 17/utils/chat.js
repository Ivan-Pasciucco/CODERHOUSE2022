const mongoose = require("mongoose");
const mensajeSchema = require("../db/mensajeSchema");
const { normalize, schema, denormalize } = require("normalizr");
const util = require("util");
require("dotenv").config();

class Chat {
  constructor() {}

  async connectDB() {
    try {
      const URL = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.1lcuy.mongodb.net/${process.env.CHATDB}?retryWrites=true&w=majority`;
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addMessage(mensaje) {
    try {
      await this.connectDB();
      await mensajeSchema.create(mensaje);
      mongoose.disconnect();
      console.log("mensaje guardado con exito");
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async readMessages() {
    try {
      await this.connectDB();
      const data = await mensajeSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  normalizar(chatSinNormalizar) {
    const chatId = { id: "mensajes", mensajes: chatSinNormalizar };
    const author = new schema.Entity("author");
    const text = new schema.Entity("text", {
      author: author,
    });
    const mensajes = new schema.Entity("mensajes", {
      author: author,
      messages: [text],
    });

    const normalizedChat = normalize(mensajes2, { author, mensajes });
    console.log(util.inspect(normalizedChat, false, 12, true));
  }
}

module.exports = Chat;
