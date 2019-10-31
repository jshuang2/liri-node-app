require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (process.argv.length > 3) {
    var input = process.argv.slice(3).join(" ");
}

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("You have not entered a valid statement.");
}

function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            // console.log(response.data);
            formatConcertData(response.data);
        }
    )
    .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("----------------Data----------------");
          console.log(error.response.data);
          console.log("----------------Status----------------");
          console.log(error.response.status);
          console.log("----------------Status----------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
};

function spotifyThis() {
    if (input === undefined) {
        input = "The Sign Ace of Base";
    }

    spotify.search({
        type: "track",
        query: input,
        limit: 5
    }, 
    function(err, data) {
        if (err) {
            console.log("Error occurred: " + err);
        }
        formatSpotifyData(data.tracks.items);
    });
};

function movieThis() {
    var movieURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    
    if (input === undefined) {
        input = "Mr. Nobody";
        movieThis();
    }
    else {
        axios.get(movieURL).then(
            function(response) {
                // console.log(response.data);
                formatMovieData(response.data);
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
    };
};


function formatConcertData(concertResponseData) {
    
    for (i = 0; i < concertResponseData.length; i++) {
        console.log("\n--------------------------------------------------------------\n");
            console.log("Venue Name: " + concertResponseData[i].venue.name);
            var location = concertResponseData[i].venue.city + ", " + concertResponseData[i].venue.region + ", " + concertResponseData[i].venue.country;
            console.log("Venue Location: " + location);
            var formattedDate = concertResponseData[i].datetime;
            formattedDate = moment(formattedDate).format("MM/DD/YYYY");
            console.log("Event Time: " + formattedDate);
    }
    console.log("\n--------------------------------------------------------------");
}

function formatSpotifyData(spotifyResponseData) {
    if (spotifyResponseData.length < 1) {
        console.log("No results. Try again.");
    }
    else {
        for (var i = 0; i < spotifyResponseData.length; i++) {
            console.log("\n--------------------------------------------------------------\n");
            console.log("Song Name: " + spotifyResponseData[i].name);
            console.log("Artist: " + spotifyResponseData[i].artists[0].name);
            console.log("Album: " + spotifyResponseData[i].album.name);
            console.log("Preview Link: " + spotifyResponseData[i].preview_url);
        }
    console.log("\n--------------------------------------------------------------\n");
    }
}

function formatMovieData(movieResponseData) {
    if (movieResponseData.length < 1) {
        console.log("No results. Try again.");
    }
    else {
        console.log("\n--------------------------------------------------------------\n");
        console.log("Title: " + movieResponseData.Title);
        console.log("Release Year: " + movieResponseData.Year);
        console.log("IMDB Rating: " + movieResponseData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieResponseData.Ratings[1].Value);
        console.log("Country Produced: " + movieResponseData.Country);
        console.log("Language: " + movieResponseData.Language);
        console.log("Plot: " + movieResponseData.Plot);
        console.log("Actors: " + movieResponseData.Actors);
    }
    console.log("\n--------------------------------------------------------------\n");
};

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        
        var readFileData = data.split(",");
        // console.log(readFileData);
        
        command = readFileData[0];
        input = readFileData[1];
        // console.log(command);
        // console.log(input);
        
        switch (command) {
            case "concert this":
                concertThis();
                break;
            case "spotify-this-song":
                spotifyThis();
                break;
            case "movie-this":
                movieThis();
                break;
            default:
                console.log("You have not entered a valid statement.");
        }
    })
};

// console.log(command);
// console.log(input);