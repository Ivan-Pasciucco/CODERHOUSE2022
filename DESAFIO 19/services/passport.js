const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connectMongo = require('connect-mongo');
const user = require('./usuarios');
require('dotenv').config();

app.use(session({
  store: connectMongo.create({
    mongoUrl: process.env.URLDB,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 600
  }),
  secret: process.env.SECRETDB,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('registro',new localStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) => {
        try{
            const existe = await user.findUser(username);
            if(existe){
                return done(null, false)
            }else{
                await user.addUser(username,password);
                return done(null, {email: username})
            }
        }catch(e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
))

passport.use('login',new localStrategy(
    async (username, password, done) => {
        try{
            const existe = await user.findUserLogin(username,password);
            if(!existe){
                return done(null, false);
            }else{
                return done(null, existe);
            }
        }catch(e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.email)
});

passport.deserializeUser(async (email, done) => {
    try{
        const userDZ = await user.findUser(email);
        done(null, userDZ)
    }catch(e){
        console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
})

module.exports = passport