const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 200 },
  nombre: { type: String, require: true, max: 200 },
  numTel: { type: String, require: true, max: 200 },
  password: { type: String, require: true, max: 200 },
  tipoUser: { type: String, require: false, max: 200 },
});

module.exports = mongoose.model("usuarios", userSchema);
