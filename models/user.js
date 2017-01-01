var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [3]
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [6]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      default: 0
    }
  }, {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Review);
      },
      validPassword: function (password, passwd, done, user) {
        bcrypt.compare(password, passwd, function (err, isMatch) {
          if (err) console.log(err);
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      }
    }
  });


  return User;
};

