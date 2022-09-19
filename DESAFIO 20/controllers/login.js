const passport = require("../services/passport");

const login = {
  login: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/login");
    }
  },
  error: (req, res) => {
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
        res.send({ status: "logout error" });
      } else {
        res.render("pages/logOut", { nombre });
      }
    });
  },
};

module.exports = login;
