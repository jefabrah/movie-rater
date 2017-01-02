var handleError = require('./error');

module.exports = function (req, res) {
  if (req.isAuthenticated()) {
    validateAdmin(req.session.passport.user.id, function (isAdmin) {
      if (isAdmin) res.render('admin');
      else res.redirect('/');
    });
  }
  else {
    res.redirect('/');
  }

  function validateAdmin(id, cb) {
    db.User.findOne({ where: { id: id }})
      .then(function (user) {
        cb(user.admin);
      })
      .catch(function (err) {
        handleError(res, 'Unable to find user', err);
      })
  }
};