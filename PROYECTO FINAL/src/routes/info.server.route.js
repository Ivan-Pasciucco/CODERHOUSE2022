const router = require('express').Router();
const infoServerController = require('../controllers/info.server.controller');

router.get('/', infoServerController);

module.exports = router;