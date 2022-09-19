const mongoose = require("mongoose");
const userSchema = require("../models/User");
const bCrypt = require("../../utils/bcryptPass");
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

  async addUser(user) {
    try {
      await this.connectDB();
      const newUser = {
        email: user.username,
        nombre: user.nombre,
        numTel: user.numtel,
        password: await bCrypt.encryptPass(user.password),
      };
      await userSchema.create(newUser);
      mongoose.disconnect();
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async findUser(username) {
    try {
      await this.connectDB();
      const user = await userSchema.findOne({ email: username });
      mongoose.disconnect();
      return user;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async findUserLogin(username, password) {
    try {
      await this.connectDB();
      const user = await userSchema.findOne({ email: username });
      mongoose.disconnect();
      if (user && (await bCrypt.validarPass(user, password))) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }
}

const usuario = new Usuario();
module.exports = usuario;
