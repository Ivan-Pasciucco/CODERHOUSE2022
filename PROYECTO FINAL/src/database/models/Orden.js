const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    id: { type: Number, require: true},
    fyh: {type: String, require: true, max:100},
    estado: { type: String, require: true, max:100},
    emailUser: { type: String, require: true, max:100},
    productos: []
});

module.exports = mongoose.model('carrito',carritoSchema);