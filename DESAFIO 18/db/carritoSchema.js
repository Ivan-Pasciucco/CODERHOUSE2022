const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    id: { type: Number, require: true},
    timestamp: { type: String, require: true, max:100},
    productos: []
});

module.exports = mongoose.model('carrito',carritoSchema);