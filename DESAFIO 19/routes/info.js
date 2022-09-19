const express = require('express');
const router = express.Router();
const info = require('../controllers/info');

router.get('/', info);

module.exports = router;