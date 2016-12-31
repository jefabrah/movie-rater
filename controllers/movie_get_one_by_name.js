module.exports = function (req, res) {
  var title = req.params.title.replace(/-/g, ' ').trim();

  // find movie by title
  db.Movie.findOne({where: {title: title}})
    
    .then(getReviews)

    .catch(function (err) {
      console.log(err);
      res.json({
        status: 'failed',
        msg: 'could not find movie'
      });
    });

  // get all reviews for movie
  function getReviews(movieData) {
    db.Review.findAll({where: {movieId: movieData.id}})
      // get average rating
      .then(function (reviews) {
        console.log(reviews);
        if (reviews[0] === undefined) {
          console.log(true);
          return {
            movie: movieData,
            reviews: []
          }
        }
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