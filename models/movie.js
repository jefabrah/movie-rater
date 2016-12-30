module.exports = function (sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
     coverURL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Movie.hasMany(models.Review);
      }
    }
  });
  return Movie;
};

