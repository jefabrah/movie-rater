var handleError   = require('./error'),
    validateAdmin = require('./validate_admin');

module.exports = function (req, res) {
  // check user for admin access
  if (req.isAuthenticated()) {
    validateAdmin(req.session.passport.user.id, function (isAdmin, err) {
      // handle any errors
      if (err) {
        handleError(res, 'Unable to find user', err);
        return;
      }
      // if admin render admin
      if (isAdmin) {
        res.render('admin', {
          isLoggedIn: true,
          isAdmin: true
        });
      }
      // otherwise redirect to home page
      else {
        res.redirect('/');
      }
    });
  }
  else {
    res.redirect('/');
  }
};