var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

// Local Strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
      db.User.findOne({where: {username: username}})
          .then(function (user) {
            if(!user){
              return done(null, false, {message: 'Unknown User'});
            }

            db.User.validPassword(password, user.password, function(err, isMatch){
              if(isMatch){
                return done(null, user);
              } else {
                return done(null, false, {message: 'Invalid password'});
              }
            }, user);
          });
    }));

// serialize user
passport.serializeUser(function(user, done) {
  console.log('serialized user' + user);
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function(id, done) {
  console.log('deserialized id' + id);
  db.User.findOne({where: {id: id}})
      .then(function (user) {
        done(null, user);
      });
});
