const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 200 },
  password: { type: String, require: true, max: 200 },
  nombre: { type: String, require: true, max: 200 },
  direccion: { type: String, require: true, max: 200 },
  edad: { type: Number, require: true },
  numTel: { type: String, require: true, max: 200 },
  avatar: { type: String, require: true, max: 200 },
});

module.exports = mongoose.model("usuarios", usuarioSchema);
