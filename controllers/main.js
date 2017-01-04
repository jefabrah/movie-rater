var validateAdmin = require('./validate_admin'),
    handleError   = require('./error'),
    Sequelize     = require('sequelize');

module.exports = function (req, res) {
  if (req.isAuthenticated()) {
    validateAdmin(req.session.passport.user.id, function (isAdmin, err) {
      // handle any errors
      if (err) {
        handleError(res, 'Unable to find user', err);
        return;
      }
      // if not admin redirect to home page
      if (!isAdmin) {
        getAllMovies(false, true);
      }
      else {
        getAllMovies(true, true);
      }
    });
  }
  else {
    getAllMovies(false, false);
  }

  function getAllMovies(isAdmin, isLoggedIn) {
    db.Movie.findAll()
      .then(function (moviesData) {

        // add movie url
        var movies = moviesData.map(function (movie) {
          return {
            status: 'ok',
            id: movie.id,
            title: movie.title,
            summary: movie.summary,
            coverURL: movie.coverURL,
            movieURL: movie.title.replace(/ /g, '-')
          }
        });

        getReviewsForMovies(movies);
      })

      .catch(function (err) {
        handleError(res, 'Unable to query for movie by title', err);
      });

    function getReviewsForMovies(movieData) {
      db.Movie.findAll({
        include: [{
          model: db.Review,
          where: {movieId: Sequelize.col('Movie.id')}
        }]
      })
        .then(function (movieReviews) {
          try { addReviews(movieData, movieReviews); }
          catch (err) {
            handleError(res, 'Unable to get average reviews for movies', err);
          }
        })
    }

    // find all reviews for each movie get average review
    function addReviews(movieData, moviesReviews) {
      var movies = movieData.map(function (movie) {

        var reviewed = false;

        // find all ratings for movie and get average
        moviesReviews.forEach(function (movieReview) {
          if (movie.id === movieReview.id) {
            reviewed = true;

            var totalReviews = movieReview.Reviews.length;
            if (movieReview.Reviews.length === 1) {
              var sum = movieReview.Reviews[0].rating;
            } else {
              var sum = movieReview.Reviews.reduce(function (a, b) {
                return a + b.rating;
              }, 0);
            }

            var average = sum / totalReviews;
            movie.avgRating = average.toFixed(1);
          }
        });

        // if not reviewed assign 'no reviews'
        if (!reviewed) {
          movie.avgRating = 'no reviews';
        }
        return movie;
      });

      res.render('home',{
        movies: movies,
        isAdmin: false,
        isLoggedIn: false
      });
    }
  }
};