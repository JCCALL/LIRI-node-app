require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios').default;
var input = process.argv[2];
//make it so liri.js can take in one of the following commands:
//concert-this
if (input === "concert-this") {
    var artist = process.argv[3]
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
            console.log(response.artist.name)
        }
    )
}

//spotify-this-song


//movie-this
if (input === "movie-this"){
    var movie = process.argv[3]
    if(!movie){
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          var output =
            "===========LIRI FOUND THIS FOR YOU===========" +
                "\n" + 'Title: ' + response.data.Title +
                "\n" + 'Year: ' + response.data.Year +
                "\n" + 'Rated: ' + response.data.Rated +
                "\n" + 'IMDB Rating: ' + response.data.imdbRating +
                "\n" + 'Country: ' + response.data.Country +
                "\n" + 'Language: ' + response.data.Language +
                "\n" + 'Plot: ' + response.data.Plot +
                "\n" + 'Actors: ' + response.data.Actors +
                "\n" + 'Tomato Rating: ' + response.data.Ratings[1].Value +
                "\n" + 'IMDb Rating: ' + response.data.imdbRating + "\n";

          console.log(output);
        })
        .catch(function(error) {
          if (error.response) {
            
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
        
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } else {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          var output =
            "===========LIRI FOUND THIS FOR YOU===========" +
                "\n" + 'Title: ' + response.data.Title +
                "\n" + 'Year: ' + response.data.Year +
                "\n" + 'Rated: ' + response.data.Rated +
                "\n" + 'IMDB Rating: ' + response.data.imdbRating +
                "\n" + 'Country: ' + response.data.Country +
                "\n" + 'Language: ' + response.data.Language +
                "\n" + 'Plot: ' + response.data.Plot +
                "\n" + 'Actors: ' + response.data.Actors +
                "\n" + 'Tomato Rating: ' + response.data.Ratings[1].Value +
                "\n" + 'IMDb Rating: ' + response.data.imdbRating + "\n";

          console.log(output);
        })
        .catch(function(error) {
          if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            
            console.log(error.request);
          } else {
            
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
}

//do-what-it-says