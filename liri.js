require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios').default;
var fs = require("fs");
var inquirer = require("inquirer");


function question() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like the Great LIRI to find for you?",
            choices: ["Search for concerts.", "Search for songs.", "Search for movies.", "Have LIRI choose.", "Exit" ],
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
                liriSuprise()
                break;
            case "Depart from the Great LIRI":
                console.log("The Great and Powerful LIRI comands you to depart from my sight!")
                break;
        }
    })
};




//make it so liri.js can take in one of the following commands:
//concert-this
function concert(artist) {
    if (!artist){
        artist = "barenaked ladies"
    }
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
        
    for (var i = 0; i < 5; i++) {
        
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
function tunes(songName) {
    
    if (!songName){
        songName= "Black Betty"
    }
    spotify.search({type: 'track', query: songName, limit: 5 }).then(function(response) {
       for (var i = 0; i < 5; i++) {
           var result =
                "\n|+-+-+-+-+-+->The Great LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|\n" +
                "\n" + "Artist/Band: " + response.tracks.items[i].album.artists[0].name +
                "\n" + "Song: " + "'" + songName.toUpperCase() + "'" +
                "\n" + "Album: " + response.tracks.items[i].album.name +
                "\n" + "URL: " + response.tracks.items[i].album.external_urls.spotify + "\n";
                
                console.log(result); 
        };
    });
};

//movie-this
function flicks(movie){
    
    if(!movie){
        movie = "Logan Lucky";
        }
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          var output =
            "\n|+-+-+-+-+-+->The Great LIRI FOUND THIS FOR YOU<+-+-+-+-+-+-|\n" +
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
function liriSuprise() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        tunes(dataArr[1]);
        
    })
}
question();