require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (process.argv.length > 3) {
    var input = process.argv.slice(3).join("");
    console.log(input);
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
            console.log(response.data);
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