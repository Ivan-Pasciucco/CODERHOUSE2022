const bCrypt = require('bcrypt');

const bcrypt = {
    async validarPass(user, password){
        try{
            return bCrypt.compareSync(password, user.password);
        }catch(e){
            console.log(`Ocurrio un error ${e}`);
        }
    },
    async encryptPass(password){
        try{
            return bCrypt.hashSync(
                password,
                bCrypt.genSaltSync(10),
                null);
        }catch(e){
            console.log(`Ocurrio un error${e}`);
        }
    }
}

module.exports = bcrypt;