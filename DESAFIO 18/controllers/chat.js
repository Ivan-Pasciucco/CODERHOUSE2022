const mongoose = require("mongoose");
const mensajeSchema = require("../db/mensajeSchema");
const log4js = require("../utils/logs");
const logError = log4js.getLogger("error");
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
      logError.error(e);
    }
  }

  async addMessage(mensaje) {
    try {
      await this.connectDB();
      await mensajeSchema.create(mensaje);
      mongoose.disconnect();
    } catch (e) {
      logError.error(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async readMessages() {
    try {
      await this.connectDB();
      const data = await mensajeSchema.find();
      mongoose.disconnect();
      return data;
    } catch (e) {
      logError.error(`Ha ocurrido el siguiente error: ${e}`);
    }
  }
}

module.exports = Chat;
