const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, require: true},
    descripcion: { type: String, require: true, max:100},
    precio: { type: Number, require: true},
    categoria: { type: String, require: true, max: 100},
    foto: { type: String, require: true, max:100},
    idUnico: {type: String, require: false, max:100}
});

module.exports = mongoose.model('productos',productSchema);