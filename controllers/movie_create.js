module.exports = function (req, res) {
  db.Movie.create({
    title: req.body.title,
    summery: req.body.summery,
    coverURL: req.body.coverURL
  }).then(function (movie) {
    res.json({
      status: 'ok',
      movie: {
        title: movie.title,
        summery: movie.summery,
        coverURL: movie.coverURL
      }
    })
  }).catch(function (err) {
    console.log(err);
  })
};