const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const connectMongo = require("connect-mongo");
const Usuario = require("../controllers/usuarios");
const usuario = new Usuario();
const { newUser } = require("../utils/nodemailer");
const log4js = require("../utils/logs");
const logConsole = log4js.getLogger("consola");
const logError = log4js.getLogger("error");
require("dotenv").config();

app.use(
  session({
    store: connectMongo.create({
      mongoUrl: process.env.URLDB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: process.env.SECRETDB,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "registro",
  new localStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const existe = await usuario.findUser(username);
        if (existe) {
          return done(null, false);
        } else {
          await usuario.addUser(req.body, req.file);
          await newUser(req.body);
          return done(null, { email: username });
        }
      } catch (e) {
        logError.error(`Ha ocurrido el siguiente error: ${e}`);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const existe = await usuario.findUserLogin(username, password);
      if (!existe) {
        return done(null, false);
      } else {
        logConsole.info("Inicio de sesion con exito");
        return done(null, existe);
      }
    } catch (e) {
      logError.error(`Ha ocurrido el siguiente error: ${e}`);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const userDZ = await usuario.findUser(email);
    done(null, userDZ);
  } catch (e) {
    logError.error(`Ha ocurrido el siguiente error: ${e}`);
  }
});

module.exports = passport;
