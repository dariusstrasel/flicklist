

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
};


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99"
};


/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


/**
 * Makes an AJAX request to the /search/movie endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(searchTerm, callback) {
  console.log("searching for movies with '" + searchTerm + "' in their title...");
    $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: searchTerm
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });

  // TODO 9
  // implement this function as described in the comment above
  // you can use the body of discoverMovies as a jumping off point


}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title)
      .attr("class", "item-watchlist");
      // TODO 3
      // give itemView a class attribute of "item-watchlist"

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);

    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
          console.log(this);
          if (model.watchlistItems.indexOf(movie) === -1){
              model.watchlistItems.push(movie);
              render();
          } else{
              // Pass
              console.log("Movie: '", movie.original_title, "' already in WatchList.")
          }
      });

    if (model.watchlistItems.indexOf(movie) !== -1){
              button.prop("disabled", true);
          }

      // TODO 2
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf()


    // TODO 1
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button
    var move_overview = $("<p></p>")
        .text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(button)
      .append(move_overview);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}




