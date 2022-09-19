const express = require('express');
const router = express.Router()

// Importacion de los demas routers
const index = require('./index');
const info = require('./info');
const login = require('./login');
const productos = require('./productos');
const randoms = require('./randoms');
const register = require('./register');

router.use('/', index);
router.use('/info', info);
router.use('/login', login);
router.use('/productos', productos);
router.use('/randoms', randoms);
router.use('/register', register);

module.exports = router;