module.exports = function (req, res) {
  var title = req.params.title.replace(/-/g, ' ').trim().toLowerCase();

  db.Movie.findOne({title: title})

    .then(getReviews)

    .catch(function (err) {
      console.log(err);
      res.json({
        status: 'failed',
        msg: 'could not find movie'
      });
    });

  function getReviews(movieData) {
    db.Review.findAll({where: {movieId: movieData.id}})
      // get average rating
      .then(function (reviews) {

        var totalReviews = reviews.length;
        var sum = reviews.reduce(function (a, b) {
          return a.rating + b.rating;
        });

        var movie = movieData;
        movie.avgRating = sum / totalReviews;
        return {
          movie: movie,
          reviews: reviews
        }
      })
      // render movie and reviews
      .then(function (movieReviewData) {
        res.render('movie', {
          coverURL: movieReviewData.movie.coverURL,
          title: movieReviewData.movie.title,
          summary: movieReviewData.movie.summary,
          isLoggedIn: req.isAuthenticated(),
          avgRating: movieReviewData.movie.avgRating,
          reviews: movieReviewData.reviews
        });
      })
      .catch(function (err) {
        console.log(err);
        res.json({
          status: 'failed',
          msg: 'could not find reviews'
        })
      })
  }
};