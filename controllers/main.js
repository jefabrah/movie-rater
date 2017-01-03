var validateAdmin = require('./validate_admin');

module.exports = function (req, res) {
  if (req.isAuthenticated()) {
    validateAdmin(req.session.passport.user.id, function (isAdmin, err) {
      // handle any errors
      if (err) {
        handleError(res, 'Unable to find user', err);
        return;
      }
      // if not admin redirect to home page
      if (!isAdmin) {
        res.render('home', {
          isAdmin: false,
          isLoggedIn: true
        });
      }
      else {
        res.render('home', {
          isAdmin: true,
          isLoggedIn: true
        })
      }
    });
  }
  else {
    res.render('home',{
      isAdmin: false,
      isLoggedIn: false
    });
    return;
  }
};