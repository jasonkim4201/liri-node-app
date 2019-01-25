require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);


const command = process.argv[2];
const name = process.argv.splice(3, process.argv.length).join(" ");

const concertThis = () => {
  
  //GET NAME about name of venue, venue location, and date of event (MM/DD/YYYY)
  //use axios. get function. use for loop to get data
  

  const searchUrl = `https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`;
  
  axios.get(searchUrl)
  .then(function (response) {

    var search = response.data;

    for (var i = 0; i < search.length; i++) {
      var concertInfo = search[i];
      //moment(stringofcodestuff).format(thestupidwayyouwanttimetoappear);
      //you're telling me i can't spam emojis on node???
      console.log(name);        
      console.log(`
      ${concertInfo.venue.name}
      ${concertInfo.venue.city}, ${concertInfo.venue.region}
      ${moment(concertInfo.datetime).format("L")}
      `);
      console.log("==========================================================================");
      
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  record();

}

const spotifySong = () => {
  
  spotify
  .search({ type: 'track', query: name ? name : "Boulevard of Broken Dreams"})
  .then(function(response) {
    //It's not stupid if it works okay????

    const music = response.tracks.items[0];
    console.log(`\nHere is some info about the song you entered.
    `);
    console.log(`Artist: ${music.album.artists[0].name}`);
    console.log(`Song name: ${music.name}`);
    console.log(`Spotify link: ${music.album.artists[0].external_urls.spotify}`);
    console.log(`Album name: ${music.album.name}`);


  
  })
  .catch(function(err) {
    console.log(err);
  });

  record();

}

const movieThis = () => {
  //get queryurl so you can actually search in the first place!
  //if user doesnt type in anything it will default to mr.nobody
  //it works. not gonna comaplain

  const defaultName = "mr.nobody";
  const queryUrl = `http://www.omdbapi.com/?t=${name ? name : defaultName}&y=&plot=short&apikey=trilogy`;
  
  axios
  .get(queryUrl)
  .then((response) => {
    //look into that other method to shorten response.data and try using that
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

  record();

}

const doIt = (input) => {
  fs.readFile("random.txt", "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    //make it so it puts the read data and makes it into the command
    console.log(data);
    var dataArr = data.split(",");
    //need to find way to remove extra quotes
    console.log(dataArr);
                          //slice begins at [1] and ends at -1
    console.log(dataArr[1].slice(1, -1));
    var song = dataArr[1].slice(1, -1);
    spotifySong(song);

  })
}

const record = () => {

  fs.appendFile("log.txt", `\n${command} ${name}`, (error) => {
    
    error ? error : console.log("\nYour entry has been logged.");
  });

}

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
  return console.log(`Please use the following commands: "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says". 
  \nEXAMPLE BELOW: 
  \nnode liri.js concert-this Lady Gaga`);
}