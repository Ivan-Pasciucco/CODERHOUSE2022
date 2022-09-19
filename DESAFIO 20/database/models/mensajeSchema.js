const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    id: {type: String, require: true, max:100},
    author: {
        id: {type: String, require: true, max:100},
        nombre: {type: String, require: true, max:100},
        apellido: {type: String, require: true, max:100},
        edad: {type: Number, require: true},
        alias: {type: String, require: true, max:100},
        avatar: {type: String, require: true, max:200}
    },
    text: {type: String, require: true, max:200},
    fyh: {type: String, require: true, max:100}
});

module.exports = mongoose.model('mensajes', mensajeSchema);