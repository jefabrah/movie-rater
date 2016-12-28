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
      len: [3]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admim: {
      type: DataTypes.BOOLEAN,
      default: 0
    }
  }, {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Review);
      }
    }
  });
  return User;
};

