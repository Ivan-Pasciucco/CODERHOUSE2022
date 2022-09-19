const express = require('express');
const router = express.Router();
const cpus = require('os').cpus().length;

router.get('/', (req, res) => {
    res.render('pages/info',{cpus});
});

module.exports = router;