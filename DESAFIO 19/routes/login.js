const express = require('express')
const router = express.Router()
const login = require('../controllers/login');

router.get('/', login.login);
router.get('/error', login.error);
router.post('/', login.loguear);
router.get('/logout', login.logout);

module.exports = router;