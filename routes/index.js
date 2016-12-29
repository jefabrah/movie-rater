var express = require('express');
var router = express.Router();

var homeController = require('../controllers/main'),
    movieCreate    = require('../controllers/movie_create'),
    moviesByName   = require('../controllers/movie_get_all_by_name'),
    movieByName    = require('../controllers/movie_get_one_by_name');


  // index route
  router.get('/', homeController);
  router.get('/test', function (req, res) {
    console.log(req);
  });

  // movie routes
  router.post('/movie', movieCreate);
  router.get('/movie', moviesByName);
  router.get('/movie/:title', movieByName);

module.exports = router;