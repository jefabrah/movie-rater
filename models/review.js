module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    reviewer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admim: {
      type: DataTypes.BOOLEAN,
      default: 0
    }
  }, {
    classMethods: {
      associate: function (models) {
        Review.belongsTo(models.Movie);
      }
    }
  });
  return Review;
};

