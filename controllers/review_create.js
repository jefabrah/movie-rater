var models = require('../models');
var Sequelize = require('sequelize');
var handleError = require('./error');

module.exports = function (req, res) {
  var username = req.session.passport.user.username;

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
    { reviewer: username,
      movieId: req.body.movieId
    }})
      .then(function (review) {
        if (review) {
          console.log('Cannot create multiple reviews for the same movie');
          res.render('error', {
            error: 'Cannot create multiple reviews for the same movie'
          });
        } else {
          createReview()
        }
      })
      .catch(function (err) {
        handleError(res, 'Could not check for duplicate reviews', err);
      })
  }

  function createReview() {
    db.Review.create({
        reviewer: username,
        rating: parseInt(req.body.rating),
        review: req.body.review,
        MovieId: req.body.movieId
      },
      {
        include: [models.Movie]
      })
      .then(function (reviewData) {
        console.log(req.body.movieTitle);
        var title = req.body.movieTitle.replace(/ /g, '-');
        res.redirect('/movie/' + title);
      })
      .catch(function (err) {
        handleError(res, 'Unable to create review', err);
      });

  }


  checkForDuplicates();
};
