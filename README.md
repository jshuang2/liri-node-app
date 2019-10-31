# liri-node-app
LIRI is a node.js take on SIRI for your iPhone. While SIRI operates via speech recognition, LIRI operates via language interpretation and recognition. 

### NPM Packages
LIRI is a command line interface (CLI) node application that utilizes multiple npm packages. These include: 

  * node-spotify-api
  * Axios
  * Bands In Town API
  * OMDB API
  * Moment
  * DotEnv

### Functionality
There are multiple commands that LIRI is able to process. It utilizes the above mentioned npm packages to accomplish them. Listed below are LIRI's main functions.

1. By typing 'concert-this *artist*' into the CLI, LIRI has the ability to read user input and generate listed data for:
   * Name of venues for upcoming concerts
   * Venue location
   * Date of each event

2. By typing 'spotify-this-song *song*' into the CLI, LIRI is able to call the Spotify API and generate data for:
   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from

3. By typing 'movie-this *movie*' into the CLI, LIRI calls the OMDB API and outputs the below data:
   * Movie title
   * Year the movie came out
   * IMDB rating of the movie
   * Rotten Tomatoes rating of the movie
   * Country where the movie was produced
   * Language of the movie
   * Plot of the movie
   * Actors in the movie

4. By typing 'do-what-it-says' into the CLI, LIRI will read the text in the file called random.txt located in the same directory and output data accordingly based on what the text tells it to do.

<br>

#### Future Considerations
1. Creating a log file that will log all previously made commands.
2. Implementing more acceptable commands.
3. Updating README with screenshots or gifs that can visually showcase how the application works.



<br>

**DISCLAIMER**

If you'd like to use this application for your own personal use, you will need to create your own .env file. In this file, include both your Spotify API **key** and **secret**.

