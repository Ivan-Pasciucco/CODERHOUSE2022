const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  timestamp: { type: String, require: true, max: 100 },
  nombre: { type: String, require: true, max: 150 },
  descripcion: { type: String, require: true, max: 200 },
  codigo: { type: Number, require: true },
  foto: { type: String, require: true, max: 100 },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
});
module.exports = mongoose.model("productos", productosSchema);
