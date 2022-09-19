const mongoose = require("mongoose");
const usuarioSchema = require("../db/usuarioSchema");
const bCrypt = require("bcrypt");
require("dotenv").config();

class Usuario {
  constructor() {}

  async connectDB() {
    try {
      const URL = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.1lcuy.mongodb.net/${process.env.USERSDB}?retryWrites=true&w=majority`;
      let connect = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async validarPass(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

  async encryptPass(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  async addUser(username, password) {
    try {
      await this.connectDB();
      const newUser = {
        email: username,
        password: await this.encryptPass(password),
      };
      await usuarioSchema.create(newUser);
      mongoose.disconnect();
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async findUser(username) {
    try {
      await this.connectDB();
      const user = await usuarioSchema.findOne({ email: username });
      mongoose.disconnect();
      return user;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }

  async findUserLogin(username, password) {
    try {
      await this.connectDB();
      const user = await usuarioSchema.findOne({ email: username });
      mongoose.disconnect();
      if (user && (await this.validarPass(user, password))) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  }
}

module.exports = Usuario;
