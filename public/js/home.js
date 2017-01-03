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
      } else {
        var $noResultDiv = $('<div class="no-results">No movies matched your search</div>');
        $('#movie-list').html($noResultDiv);
      }
    });
  }


  // create elements for movies
  function createMovies(movies) {
    var $container = $('<div class="movie-list-container">');

    var movieCards = movies.map(function (movie) {
      return (function makeMovieCard(movie) {
        var $card     = $('<div class="card card-movie slideRight">');
        var $img      = $('<img width="auto">');
        var $block    = $('<div class="card-block">');
        var $title    = $('<h4 class="card-title">');
        var $summary  = $('<p class="card-text">');
        var $avgRating = $('<p class="card-text">');
        var $link     = $('<a class="btn btn-outline-primary">See Reviews</a>');

        var summary = movie.summary;
        if (summary.length >= 100) {
          summary = summary.slice(0, 100).concat('...');
        }

        $img.attr('src', movie.coverURL);
        $title.text(movie.title);
        $summary.text(summary);
        $avgRating.text('Average Rating: ' + movie.avgRating);
        $link.attr('href', '/movie/'+movie.title.replace(/ /g, '-'));
        $block.append($title, $summary, $avgRating, $link);
        return $card.append($img, $block);
      })(movie)
    });

    $('#movie-list').html($container);

    // animate movie cards
    function animateCards() {
      var cardNum = 1;
      var totalCards = movieCards.length;
      $('.movie-list-container').append(movieCards[0]);
      if (movieCards.length === 1) return;
      setInterval(function () {
        $('.movie-list-container').append(movieCards[cardNum]);
        cardNum++;
        if (cardNum > totalCards) {
          clearInterval();
        }
      }, 200)
    }
    animateCards();
  }













  checkInput();
}));