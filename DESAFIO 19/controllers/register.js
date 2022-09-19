const passport = require("../services/passport");

const register = {
  register: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/register");
    }
  },
  error: (req, res) => {
    res.render("pages/registerError");
  },
  exito: (req, res) => {
    res.render("pages/registerExito");
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/register/exito");
    });
  },
  registrar: passport.authenticate("registro", {
    successRedirect: "/register/logout",
    failureRedirect: "/register/error",
  }),
};

module.exports = register;
