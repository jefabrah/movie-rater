var homeController = require('./controllers/main'),
    movieCreate    = require('./controllers/movie_create'),
    moviesByName    = require('./controllers/movie_get_all_by_name');


module.exports = function routes(app) {
  // index route
  app.get('/', homeController);

  // movie routes
  app.post('/movie', movieCreate);
  app.get('/movie', moviesByName);

};