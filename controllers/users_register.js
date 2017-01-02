var passport  =  require('passport'),
    bcrypt    =  require('bcrypt-nodejs');
                 require('../config/passport');

module.exports = function (req, res) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  // Validation
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('signup',{
      errors:errors
    });
  } else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var newUser = {
      email: email,
      username: username,
      password: hash
    };

    db.User.create(newUser)
      .then(function (user) {
        console.log('New User:',user.dataValues);
      });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
};