require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + command + "/events?app_id=codingbootcamp";

console.log(bandsInTownUrl);