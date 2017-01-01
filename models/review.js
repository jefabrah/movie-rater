module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    reviewer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
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

