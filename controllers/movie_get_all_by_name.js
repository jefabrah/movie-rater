var Sequelize = require('sequelize');
var handleError = require('./error');

module.exports = function (req, res) {
  db.Movie.findAll()
    .then(function (moviesData) {

      // filter movies by queried title
      var filteredMovies = moviesData.filter(function (movie) {
        var title = movie.title.toLowerCase();
        var queryTitle = req.query.title.toLowerCase();
        return title.search(queryTitle) >= 0;
      });

      // remove ids and timestamps
      var movies = filteredMovies.map(function (movie) {
        return {
          status: 'ok',
          id: movie.id,
          title: movie.title,
          summary: movie.summary,
          coverURL: movie.coverURL
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
        where: {movieId: Sequelize.col('movie.id')}
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

          console.log(movieReview.Reviews.length);
          var totalReviews = movieReview.Reviews.length;
          if (movieReview.Reviews.length === 1) {
            var sum = movieReview.Reviews[0].rating;
          } else {
            var sum = movieReview.Reviews.reduce(function (a, b) {
              return a.rating + b.rating;
            });
          }
          movie.avgRating = sum / totalReviews;
        }
      });

      // if not reviewed assign 'no reviews'
      if (!reviewed) {
        movie.avgRating = 'no reviews';
      }
      return movie;
    });

    res.json(movies);
  }
};