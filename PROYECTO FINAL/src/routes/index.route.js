const router = require('express').Router();
const index = require('../controllers/index.controller');
const isAuth = require('../middlewares/isAuth');

router.get('/', index);

module.exports = router;