const cpus = require("os").cpus().length;
const PORT = process.env.PORT || 8080;
const compression = require("compression");

const info =
  (compression(),
  (req, res) => {
    res.render("pages/info", { cpus, PORT });
  });

module.exports = info;
