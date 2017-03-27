
var model = {
  watchlistItems: [],
  browseItems: []
};


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99" // TODO 0 put your api key here
};


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
		  console.log("We got a response from The Movie DB!");
		  //console.log("Results: ", response.results);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            for (var index = 0; index < response.results.length; index++){
                model.browseItems.push(response.results[index]);
            }

			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
    console.log("renderInvoked()");


  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  // for each movie on the current browse list
  model.browseItems.forEach(function(movie) {
      var movie_name = movie.original_title;
      var movieElement = $("<li>" + movie_name + "</li>");
      var movieButton = $("<button>Add to Watchlist</button>");

      movieButton.click(function () {
          movie_object = movie;
          console.log("Adding", movie_object.original_title, "to WatchList.");
          if (!(movie_object.original_title in model.watchlistItems)) {
            model.watchlistItems.push(movie_object.original_title);
          }
          render();
      });

      $('#section-browseList').children('ul').append(movieElement, movieButton);
  });

  model.watchlistItems.forEach(function (movie) {
      var movie_name = movie;
      var movieElement = $("<li>" + movie_name + "</li>");
      $('#section-watchlist').children('ul').append(movieElement);
  });

  model.browseItems = [];
  model.watchlistItems = [];
  }

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

