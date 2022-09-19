const bCrypt = require('bcrypt');
const userDB = require('../database/usuarios');

function validarPass(user, password){
    return bCrypt.compareSync(password, user.password);
}

function encryptPass(password){
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}

const user = {
    addUser: async (username,password) => {
            try{
                const newUser = {
                    email: username,
                    password: encryptPass(password)
                };
                await userDB.addNewUser(newUser);
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    findUser: async (username) => {
            try{
                const user = await userDB.findOneUser(username);
                return user;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    findUserLogin: async (username,password) => {
        try{
            const user = await userDB.findOneUser(username);
            if( user && validarPass(user,password) ) {
                return user;
            }else{
                return null;
            }
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
}

module.exports = user;