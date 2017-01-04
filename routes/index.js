var express = require('express');
var router = express.Router();

var homeController = require('../controllers/main'),
    movieCreate    = require('../controllers/movie_create'),
    moviesByName   = require('../controllers/movie_get_all_by_name'),
    movieByName    = require('../controllers/movie_get_one_by_name'),
    reviewCreate   = require('../controllers/review_create');
    signS3         = require('../controllers/s3');


// index route
router.get('/', homeController);

// movie routes
router.post('/movie', movieCreate);
router.get('/movies', moviesByName);
router.get('/movie/:title', movieByName);

// review routes
router.post('/review', reviewCreate);

// s3 signed url
router.get('/signS3', signS3);

module.exports = router;