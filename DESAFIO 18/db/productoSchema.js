const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  timestamp: { type: String, require: true, max: 100 },
  nombre: { type: String, require: true, max: 100 },
  descripcion: { type: String, require: true, max: 100 },
  codigo: { type: Number, require: true },
  foto: { type: String, require: true, max: 100 },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
});

module.exports = mongoose.model("productos", productoSchema);
