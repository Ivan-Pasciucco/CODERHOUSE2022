const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: { type: String, require: true, max:100},
    fyh: {type: String, require: true, max:100},
    productos: []
});

module.exports = mongoose.model('carrito',cartSchema);