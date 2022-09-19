const passport = require("passport");

const loginController = {
  login: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/login");
    }
  },
  error: (req, res) => {
    console.log("Ocurrio un error de autenticacion");
    res.render("pages/loginError");
  },
  loguear: passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/error",
  }),
  logout: (req, res) => {
    const nombre = req.session.passport.user;
    req.logout((err) => {
      if (err) {
        console.log("No pudo cerrar sesion");
        res.send({ status: "logout error" });
      } else {
        console.log("Se ha cerrado sesion correctamente");
        res.render("pages/logOut", { nombre });
      }
    });
  },
};

module.exports = loginController;
