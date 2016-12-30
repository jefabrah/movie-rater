var express = require('express');
var router = express.Router();

var homeController = require('../controllers/main'),
    movieCreate = require('../controllers/movie_create'),
    moviesByName = require('../controllers/movie_get_all_by_name'),
    movieByName = require('../controllers/movie_get_one_by_name');
    signS3 = require('../controllers/s3');


// index route
router.get('/', homeController);
router.get('/test', function (req, res) {
  console.log(req);
});

// movie routes
router.post('/movie', movieCreate);
router.get('/movies', moviesByName);
router.get('/movie/:title', movieByName);

// s3 signed url
router.get('/signS3', function (req, res) {
  signS3(req.query, function (signedRequest, err) {
    if (err) res.end();

    res.write(JSON.stringify(signedRequest));
    res.end();
  });
});

module.exports = router;