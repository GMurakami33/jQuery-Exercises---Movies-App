
$(function () {
  const movies = [];

  $('#new-movie').on('submit', function(e) {
    e.preventDefault(); 
    const title = $('#title').val();
    const rating = $('#rating').val();
    // validation 
    if (title.length >= 2 && rating >= 0 && rating <= 10) {
      const movie = {
        title: title,
        rating: rating
      };
      movies.push(movie); 
      renderMovies(movies); 
      $('#title').val('');
      $('#rating').val('');
    }
    else {
      alert('Invalid Input. Title must be 2 characters long and Rating must be 0-10');
    }
  });
  
  $('#sort-title').on('click', function() {
    movies.sort(function (a, b) {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1; 
      }
      if (titleA > titleB) {
        return 1; 
      }
      return 0; 
    });
    renderMovies(movies);
  });

  $('#sort-rating').on('click', function() {
    movies.sort(function(a, b) {
      return b.rating - a.rating;
    });
    renderMovies(movies);
  });

  $(document).on('click', '.remove-movie', function() {
    const index = $(this).data('index');
    movies.splice(index, 1);
    renderMovies(movies);
  });

  function renderMovies(movies) {
    const movieList = $('#movie-list');
    movieList.empty();
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const movieItem = $('<li>').text(movie.title + ' - ' + movie.rating);
      const removeButton = $('<button>').text('X').addClass('remove-movie').data('index', i);
      movieItem.append(removeButton);
      movieList.append(movieItem);
    }
  }
});
