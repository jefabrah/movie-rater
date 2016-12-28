module.exports = function routes(app) {
  app.get('/', function(req, res) {
    console.log('index route');
    res.render('home');
  });
};