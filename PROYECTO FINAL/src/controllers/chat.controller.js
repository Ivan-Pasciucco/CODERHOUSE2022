const chatService = require("../services/chat.services");

const chatController = {
  newMessage: async (req, res) => {
    try {
      const data = await chatService.newMesService(req.body);
      return data;
    } catch (e) {
      console.log(`Ocurrio un error: ${e}`);
    }
  },
  getMessages : async (req, res) => {
    try{
        const email = req.session.passport.user;
        const data = await chatService.getMesService();
        res.render('pages/mensajes',{data, email});
        return data;
    }catch(e){
        console.log(`Ocurrio un error: ${e}`);
    }
}
}

module.exports = chatController;