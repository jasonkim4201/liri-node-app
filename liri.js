require("dotenv").config();

var keys = require("./keys.js");
const axios = require("axios");

//var spotify = new Spotify(keys.spotify);


const command = process.argv[2];
const name = process.argv.splice(3, process.argv.length).join("+");

//make functions for each command
const concertThis = () => {
  //use bands in town artists events API to search for artist and info about name of venue, venue location, and date of event (MM/DD/YYYY)
    


}

const spotifySong = (artist) => {
  //get queryurl for spotify
}

const movieThis = () => {
  //get queryurl so you can actually search in the first place!
  //if user doesnt type in anything it will default to mr.nobody

  const defaultName = "mr.nobody";
  const queryUrl = `http://www.omdbapi.com/?t=${name ? name : defaultName}&y=&plot=short&apikey=trilogy`;
  
  axios
  .get(queryUrl)
  .then((response) => {
    //because I'm too lazy to repeat response.data
    const movie = response.data;

    console.log(`
    Title: ${movie.Title}
    Year: ${movie.Year}
    IMDB rating: ${movie.Ratings[0].Value}
    Rotten Tomato rating: ${movie.Ratings[1].Value}
    Country: ${movie.Country}
    Language: ${movie.Language}
    Plot: ${movie.Plot}
    Actors: ${movie.Actors}`);
  })
  .catch((err) => console.log(err));
}

const doIt = () => {
  
}


//make switch statement for command variable
switch (command) {
  
  case "concert-this":
  return concertThis();

  case "spotify-this-song":
  return spotifySong();

  case "movie-this":
  return movieThis();

  case "do-what-it-says":
  return doIt();

  default:
  return console.log(`Error. Not a proper command.`);
}