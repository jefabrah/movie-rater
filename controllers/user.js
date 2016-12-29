var bcrypt = require('bcrypt-nodejs');

// login page
exports.login = function (req, res) {
  res.render('login');
};
// signup page
exports.signUp = function (req, res) {
  res.render('signup');
};


exports.register = function (req, res) {
  db.User.find(
      {where: {username: req.username}}).then(function (user) {

    if (!user) {
      // hash password before creating
      try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
      }
      catch (err) { console.log('Hashing error:', err) };

      db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash
      }).then(function () {
        res.redirect('/')
      }).catch(function (err) {
        console.log(err);
      });

    } else {
      res.redirect('/signup');
    }
  });
};