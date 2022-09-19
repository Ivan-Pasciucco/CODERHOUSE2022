const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('../db/configPassport');
require('dotenv').config();

router.use(cookieParser());
router.use(session({
  store: connectMongo.create({
    mongoUrl: `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.1lcuy.mongodb.net/${process.env.SESSIONSDB}?retryWrites=true&w=majority`,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 600
  }),
  secret: `${process.env.SECRETDB}`,
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());


// Rutas--------------------------------------------------------------------------------------------
router.get('/',(req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/')
  }else{
    res.render('pages/register');
  }
});

router.get('/error',(req, res) => {
  res.render('pages/registerError');
});

router.get('/exito',(req, res) => {
  res.render('pages/registerExito');
});

router.get('/logout',(req, res) => {
  req.logout( err => {
    if (err) { 
      console.log(err);
    }
    res.redirect('/register/exito');
  });
});

router.post('/',passport.authenticate('registro',{
  successRedirect: '/register/logout',
  failureRedirect: '/register/error'
}))

module.exports = router;