const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const usuario = require("../services/user.services");
const { newUser } = require("../utils/nodemailer");
require("dotenv").config();

passport.use(
  "registro",
  new localStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const existe = await usuario.findUserService(username);
        if (existe) {
          return done(null, false);
        } else {
          await usuario.addUserService(req.body);
          // await newUser(req.body);
          return done(null, { email: username });
        }
      } catch (e) {
        console.log(`Ha ocurrido el siguiente error: ${e}`);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const existe = await usuario.findUserLoginService(username, password);
      if (!existe) {
        return done(null, false);
      } else {
        console.log("Inicio de sesion con exito");
        return done(null, existe);
      }
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const userDZ = await usuario.findUserService(email);
    done(null, userDZ);
  } catch (e) {
    console.log(`Ha ocurrido el siguiente error: ${e}`);
  }
});

module.exports = passport;
