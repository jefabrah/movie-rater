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
            title: movie.title,
            summery: movie.summery,
            coverURL: movie.coverURL
          }
        });

        res.json(movies);
      })

      .catch(function (err) {
        console.log(err);
        res.json({
          errmsg: 'Database query for movies by title has failed',
          err: err
        })
      })
};