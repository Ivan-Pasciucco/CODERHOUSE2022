const mensajeDao = require("../database/daos/chat.dao");
const userService = require("./user.services");

const mensajeService = {
  newMesService : async (mensaje) => {
          try{
              const user = await userService.findUserService(mensaje.email);
              if(user.tipoUser){
                  mensaje.tipoUser = 'Administrador';
              }else{
                  mensaje.tipoUser = "Cliente";
              }
              const data = await mensajeDao.addMessage(mensaje);
              return data;
          }catch(e){
              console.log(`Ha ocurrido el siguiente error: ${e}`);
          }
      },
  getMesService : async () => {
          try{
              const data = await mensajeDao.readMessages();
              return data;
          }catch(e){
              console.log(`Ha ocurrido el siguiente error: ${e}`);
          }
      }
}

module.exports = mensajeService;