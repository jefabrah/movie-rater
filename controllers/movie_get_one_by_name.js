var handleError   = require('./error'),
    validateAdmin = require('./validate_admin');

module.exports = function (req, res) {
  var title = req.params.title.replace(/-/g, ' ').trim();

  // find movie by title
  db.Movie.findOne({where: {title: title}})
    
    .then(getReviews)

    .catch(function (err) {
      handleError(res, 'Could not find movie', err);
    });

  // get all reviews for movie
  function getReviews(movieData) {
    db.Review.findAll({where: {movieId: movieData.id}})
      // get average rating
      .then(function (reviews) {
        // if no reviews return movieData
        if (reviews[0] === undefined) {
          return {
            movie: movieData,
            reviews: []
          };
          // if only one review return rating from review
        } else if (reviews.length === 1) {
          movieData.avgRating = reviews[0].rating;
          return {
            movie: movieData,
            reviews: reviews
          };
        }
        var totalReviews = reviews.length;

        var sum = reviews.reduce(function (a, b) {
          return a + b.rating;
        }, 0);
        var movie = movieData;
        var average = sum / totalReviews;
        movie.avgRating = average.toFixed(1);
        return {
          movie: movie,
          reviews: reviews
        }
      })
      // check if user reviewed movie already
      .then(function (movieReviewData) {
        // check for previous reviews
        var didReview = false;
        if (req.isAuthenticated()) {
          var username = req.session.passport.user.username;
          movieReviewData.reviews.forEach(function (review) {
            if (review.reviewer === username) didReview = true;
          });

          // check for admin access
         validateAdmin(req.session.passport.user.id, renderMovie)
        }
        // if not logged in render movie
        else renderMovie(false);

        function renderMovie(isAdmin) {
          var movieData = movieReviewData;
          movieData.movie.didReview = didReview;

          // render movie and reviews
          res.render('movie', {
            movieId: movieData.movie.id,
            coverURL: movieData.movie.coverURL,
            title: movieData.movie.title,
            summary: movieData.movie.summary,
            isAdmin: isAdmin,
            isLoggedIn: req.isAuthenticated(),
            didReview: movieData.movie.didReview,
            avgRating: movieData.movie.avgRating,
            reviews: movieData.reviews
          });
        }
      })
      .catch(function (err) {
        handleError(res, 'Could not get reviews', err);
      })
  }
};