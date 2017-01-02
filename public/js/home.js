($(document).ready(function () {

  // check for search input change
  function checkInput() {
    var val = '';
    // get movies on search
    setInterval(function () {
      var newVal = $('#movie-search').val();
      if (newVal === val || newVal === '') return;
      val = newVal;
      getMoviesFromInput(newVal);
    }, 1000);
  }

  // query movies in database
  // with search input value
  function getMoviesFromInput (val) {
    var query = '/movies?title=' + val;
    $.get(query, function (data) {
      if (data[0] !== undefined) {
        createMovies(data);
      }
    });
  }


  // create elements for movies
  function createMovies(movies) {
    var $container = $('<div class="container-fluid>');

    var movieCards = movies.map(function (movie) {
      return (function makeMovieCard(movie) {
        var $card     = $('<div class="card">');
        var $img      = $('<img width="auto">');
        var $block    = $('<div class="card-block">');
        var $title    = $('<h4 class="card-title">');
        var $summary  = $('<p class="card-text">');
        var $avgRating = $('<p class="card-text">');
        var $link     = $('<a class="btn btn-outline-primary">See Reviews</a>');

        $img.attr('src', movie.coverURL);
        $title.text(movie.title);
        $summary.text(movie.summary);
        $avgRating.text('Average Rating: ' + movie.avgRating);
        $link.attr('href', '/movie/'+movie.title.replace(/ /g, '-'));
        $block.append($title, $summary, $avgRating, $link);
        return $card.append($img, $block);
      })(movie)
    });

    $container.append(movieCards);
    $('#movie-list').html(movieCards);
  }













  checkInput();
}));