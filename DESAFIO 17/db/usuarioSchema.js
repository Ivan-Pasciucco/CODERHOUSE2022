const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {type: String, require: true, max:200},
    password: {type: String, require: true, max:200}
});

module.exports = mongoose.model('usuarios', usuarioSchema);