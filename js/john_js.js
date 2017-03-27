
var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "0513dc1a1a68acbee7b2f39910ee2089" // TODO 0 put your api key here
}


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
			console.log(response);

			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            model.browseItems = response.results;
            console.log(model.browseItems);
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  $('#section-watchlist ul').empty();
  $('#section-browse ul').empty();



  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
      var movieTitle = $('<p></p>').text(movie);

      var watchView = $('<li></li>').append(movieTitle);

      $('#section-watchlist ul').append(watchView);
  });

  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {

		// insert a list item into the <ul> in the browse section
        var title = $('<p></p>').text(movie.original_title);

        var movieView = $('<li></li>').append(title);

        $('#section-browse ul').append(movieView);

		// the list item should include a button that says "Add to Watchlist"
        var button = $('<button></button>').text("Add to Watchlist");

        movieView.append(button);

		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
        button.click( function () {
            model.watchlistItems.push(movie.original_title)
            render();
        });
  });
    console.log(model.watchlistItems)

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
