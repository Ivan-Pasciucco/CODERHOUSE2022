const chatDB = require("../database/chat");

const chat = {
  addMessage: async (mensaje) => {
    try {
      await chatDB.addNewMessage(mensaje);
      console.log("mensaje guardado con exito");
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  },
  readMessages: async () => {
    try {
      const data = await chatDB.getAllMessages();
      return data;
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  },
};

module.exports = chat;
