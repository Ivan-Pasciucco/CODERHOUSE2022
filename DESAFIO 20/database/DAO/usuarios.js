const mongoose = require("mongoose");
const usuarioSchema = require("../models/usuarioSchema");
require("dotenv").config();

class Usuario {
  constructor() {}

  async connectDB() {
    try {
      const URL = process.env.URLDB;
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addNewUser(newUser) {
    try {
      await this.connectDB();
      await usuarioSchema.create(newUser);
      mongoose.disconnect();
    } catch (e) {
      console.log(`Error al agregar un nuevo usuario: ${e}`);
    }
  }

  async findOneUser(username) {
    try {
      await this.connectDB();
      const user = await usuarioSchema.findOne({ email: username });
      mongoose.disconnect();
      return user;
    } catch (e) {
      console.log(`Error al buscar usuario: ${e}`);
    }
  }
}

const userDB = new Usuario();

module.exports = userDB;
