const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    title: {type: String, require: true, max:100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max:100},
});

module.exports = mongoose.model('productos', productoSchema);