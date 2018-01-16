const express = require('express');
const axios = require('axios');
const secret = require('./secret');

const spotifyRequestObj = {
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  params: {
    grant_type: 'client_credentials'
  },
  headers: {
    'Authorization': `Basic ${secret}`,
    'Content-Type':'application/x-www-form-urlencoded'
  }
}

const getSpotifyToken = async(req, res) => {
  try {
    const spotifyAPICall = await axios(spotifyRequestObj);
    res.send({ token: spotifyAPICall.data.access_token });
  } catch(e) {
    console.log(e);
  }
}

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/get-spotify-token', getSpotifyToken);

app.listen(3001, () => console.log('listening on 3001'));
