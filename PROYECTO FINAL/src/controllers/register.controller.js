const passport = require("passport");

const registerController = {
  registro: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/register");
    }
  },
  error: (req, res) => {
    console.log("Error al registrar usuario");
    res.render("pages/registerError");
  },
  exito: (req, res) => {
    console.log("Usuario registrado con exito");
    res.render("pages/registerExito");
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/register/exito");
      }
    });
  },
  registrar: passport.authenticate("registro", {
    successRedirect: "/register/logout",
    failureRedirect: "/register/error",
  }),
};

module.exports = registerController;
