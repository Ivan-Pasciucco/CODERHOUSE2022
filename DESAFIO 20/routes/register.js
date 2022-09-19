const express = require('express');
const router = express.Router();
const register = require('../controllers/register');

router.get('/', register.register);
router.get('/error', register.error);
router.get('/exito', register.exito);
router.get('/logout', register.logout);
router.post('/', register.registrar);

module.exports = router;