module.exports = function (req, res) {
  var title = req.params.title.replace('-',' ');
  console.log(title);
  db.Movie.findOne({ title: title })
      .then(function (movieData) {
        // remove ids and timestamps
        var movie = {
            title: movieData.title,
            summery: movieData.summery,
            coverURL: movieData.coverURL
          };

        res.json({
          status: 'ok',
          movie: movie
        });
      })
      .catch(function (err) {
        console.log(err);
        res.json({
          status: 'failed',
          msg: 'could not find movie'
        })
      })
};