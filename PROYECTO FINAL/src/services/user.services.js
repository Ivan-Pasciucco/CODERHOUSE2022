const userDao = require("../database/daos/user.dao");

const usuarioService = {
  addUserService: async (user) => {
    try {
      const data = await userDao.addUser(user);
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  },
  findUserService: async (username) => {
    try {
      const data = await userDao.findUser(username);
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  },
  findUserLoginService: async (username, password) => {
    try {
      const data = await userDao.findUserLogin(username, password);
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  },
};

module.exports = usuarioService;
