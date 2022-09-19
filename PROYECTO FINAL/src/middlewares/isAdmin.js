const userService = require('../services/user.services');

const isAdmin = async (req, res, next) => {
    const email = req.session.passport.user;
    const user = await userService.findUserService(email);

    if(user.tipoUser){
        next();
    }else{
        console.log(`El usuario ${email} no tiene permisos`);
        res.redirect('/');
    }
}

module.exports = isAdmin;