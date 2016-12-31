var models = require('../models');
var Sequelize = require('sequelize');

module.exports = function (req, res) {

  // TODO: make sure user is logged in
  // if (req.isAuthenticated()) {
  //   console.log(req.session.id);
  //   res.json({
  //     status: 'failed',
  //     sessionID: req.session.id
  //   });
  // } else {
  //   console.log('not authenticated');
  //   res.json({
  //     status: 'failed',
  //     msg: 'you are not logged in'
  //   });
  // }

  // check for a duplicate review
  function checkForDuplicates() {
    db.Review.findOne({where:
    { reviewer: req.body.reviewer,
      movieId: req.body.movieId
    }})
      .then(function (review) {
        if (review) {
          console.log('You already reviewed this movie');
          res.json({
            status: 'failed',
            msg: 'You already reviewed this movie'
          })
        } else {
          createReview()
        }
      })
      .catch(function (err) {
        console.log('Error checking for duplicate reviews:', err);
      })
  }

  function createReview() {
    db.Review.create({
        reviewer: req.body.reviewer,
        rating: parseInt(req.body.rating),
        review: req.body.review,
        MovieId: req.body.movieId
      },
      {
        include: [models.Movie]
      })
      .then(function (reviewData) {
        res.json({
          status: 'ok',
          review: reviewData
        });
        return reviewData;
      })
      .catch(function (err) {
        console.log(err);
        res.json({
          status: 'failed',
          msg: 'Unable to insert review'
        })
      });

  }


  checkForDuplicates();
};
