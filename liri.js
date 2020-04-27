require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios').default;

//make it so liri.js can take in one of the following commands:


//concert-this


//spotify-this-song


//movie-this
if (process.argv[2] === "movie-this"){
    if(process.argv[3] === ""){
        axios.get("http://www.omdbapi.com/?t=gladiator&y=&plot=short&apikey=trilogy").then(
        function(response) {
          console.log(response.data.Title)
          console.log("The movie's rating is: " + response.data.imdbRating);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } else {
        axios.get("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          console.log(response.data)
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
}

//do-what-it-says