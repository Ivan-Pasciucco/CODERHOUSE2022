const chatDAO = require("../database/DAO/chat");
const chatDTO  = require('../database/DTO/chat')


const chat = {
  addMessage: async (mensaje) => {
    try {
      await chatDAO.addNewMessage(mensaje);
      console.log("mensaje guardado con exito");
    } catch (e) {
      console.log(`Error al agregar mensaje: ${e}`);
    }
  },
  readMessages: async () => {
    try {
      const data = await chatDAO.getAllMessages();
      const datos = data.map(item =>{
        const dto = new chatDTO(item)
        return dto
      })
      return datos
    } catch (e) {
      console.log(`Error al leer mensajes: ${e}`);
    }
  },
};

module.exports = chat;
