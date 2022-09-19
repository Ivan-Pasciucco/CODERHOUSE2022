const cpus = require('os').cpus().length;

const infoServerController = (req, res) => {
    res.render('pages/info',{cpus});
}

module.exports = infoServerController;