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
      // if not admin redirect to home page
      if (!isAdmin) {
        res.redirect('/');
      }
    });
  }
  else {
    res.redirect('/');
    return;
  }

  db.Movie.create({
    title: req.body.title,
    summary: req.body.summary,
    coverURL: req.body.coverURL
  }).then(function (movie) {
    res.redirect('/movie/' + req.body.title);
  }).catch(function (err) {
    handleError(res, 'Unable to create movie', err);
  })
};