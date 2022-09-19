const index = (req, res) => {
    if(req.isAuthenticated()){
      res.render('pages/index',{nombre : req.session.passport.user});
    }else{
      res.redirect('/login');
    }
}

module.exports = index;