require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios').default;
var fs = require("fs");
var inquirer = require("inquirer");
var input = process.argv[2];
var userOutput = process.argv[3];
//make it so liri.js can take in one of the following commands:
//concert-this
if (input === "concert-this") {
    if (!userOutput){
        userOutput = "barenaked ladies"
    }
    axios
    .get("https://rest.bandsintown.com/artists/" + userOutput + "/events?app_id=codingbootcamp")
    .then(function(response) {
        console.log(response.data[0].lineup[0]);
    
    for (var i = 0; i < response.data.length; i++) {
        
        var result = "Venue Name: " + response.data[i].venue.name + "\n"
                    + "City: " + response.data[i].venue.city + "\n"
                    + "Date(MM/DD/YYYY): " + moment(response.data[i].datetime).format('MM DD YYYY') + "\n"
        
            
        console.log(result);
    }
    });           
};


//spotify-this-song
if (input === "spotify-this-song") {
    
    if (!userOutput){
        userOutput= "Black Betty"
    }
    spotify.search({type: 'track', query: userOutput, limit: 3 }).then(function(response) {
       for (var i = 0; i < 3; i++) {
           var result =
                "\n|+-+-+-+-+-+->LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|" +
                "\n" + "Artist/Band: " + response.tracks.items[i].album.artists[0].name +
                "\n" + "Song: " + "'" + userOutput.toUpperCase() + "'" +
                "\n" + "Album: " + response.tracks.items[i].album.name +
                "\n" + "URL: " + response.tracks.items[i].album.external_urls.spotify + "\n";
                
                console.log(result); 
        };
    });
};

//movie-this
if (input === "movie-this"){
    
    if(!userOutput){
        userOutput = "Logan Lucky";
        }
    axios.get("http://www.omdbapi.com/?t=" + userOutput + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          var output =
            "\n|+-+-+-+-+-+->LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|" +
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
    };

//do-what-it-says