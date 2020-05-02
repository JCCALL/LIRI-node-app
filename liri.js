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

function question() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like the Great LIRI to find for you?",
            choices: ["Search for concerts.", "Search for songs.", "Search for movies.", "Have LIRI choose.", "Depart from the Great LIRI" ],
            name: "select"
        }
    ).then(function(response) {
        switch (response.select) {
            case "Search for concerts.":
                inquirer.prompt(
                    {
                        type: "input",
                        message: "What Band or Artists concerts do you want to know more about?",
                        name: "pinput"
                    })
                    .then(function(answer) {
                        concert(answer.pinput.trim());
                    });
                break;
            case "Search for songs.":
                inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the name of the song?",
                        name: "pinput"
                    })
                    .then(function(answer) {
                        tunes(answer.pinput.trim());
                    });
                break;
            case "Search for movies.":
                inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the name of the movie?",
                        name: "pinput"
                    })
                    .then(function(answer) {
                        flicks(answer.pinput.trim());
                    });
                break;
            case "Have LIRI choose.":
                inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the name of the movie?",
                        name: "pinput"
                    })
                    .then(function(answer) {
                        flicks(answer.pinput.trim());
                    });
                break;
            case "Depart from the Great LIRI":
                inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the name of the movie?",
                        name: "pinput"
                    })
                    .then(function(answer) {
                        flicks(answer.pinput.trim());
                    });
                break;

        }
    })
}




//make it so liri.js can take in one of the following commands:
//concert-this
function concert(artist) {
    if (!artist){
        artist = "barenaked ladies"
    }
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
        console.log(response.data[0].lineup[0]);
    
    for (var i = 0; i < response.data.length; i++) {
        
        var result = "\n|+-+-+-+-+-+->The Great LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|\n"
                        + "\nArtist/Band: " + response.data[i].lineup[0] + "\n" 
                        + "Venue Name: " + response.data[i].venue.name + "\n"
                        + "Location: " + response.data[i].venue.location + " " + response.data[i].venue.country + "\n"
                        + "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A") + "\n"
        
            
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
                "\n|+-+-+-+-+-+->The Great LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|" +
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
            "\n|+-+-+-+-+-+->The Great LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|" +
                "\n" + 'Title: ' + response.data.Title +
                "\n" + 'Year: ' + response.data.Year +
                "\n" + 'Rated: ' + response.data.Rated +
                "\n" + 'Country: ' + response.data.Country +
                "\n" + 'Language: ' + response.data.Language +
                "\n" + 'Plot: ' + response.data.Plot +
                "\n" + 'Actors: ' + response.data.Actors +
                "\n" + 'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value +
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

question();