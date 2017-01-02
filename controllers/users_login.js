var passport  =  require('passport'),
    bcrypt    =  require('bcrypt-nodejs');
                 require('../config/passport');

module.exports = function (req, res) {
  res.redirect('/');
};