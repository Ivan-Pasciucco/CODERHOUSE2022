const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('../../services/passport');
require('dotenv').config();

router.use(cookieParser());
router.use(session({
  store: connectMongo.create({
    mongoUrl: process.env.URLDB,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 600
  }),
  secret: process.env.SECRETDB,
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

module.exports = router;