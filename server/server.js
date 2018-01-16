const express = require('express');
const axios = require('axios');

const app = express();

const getSpotifyToken = async(req, res) => {
  try {
    const spot = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic YTQ1M2NhOGFjZmU5NDdiZWJmN2JkMTY3M2UzZTVmNTM6NDU0MTY3MzUyNDI2NDkwNTg0Nzg1YWVjOGI5ZGNlODE=',
        'Content-Type':'application/x-www-form-urlencoded'
      }
    });
    res.send(spot.data.access_token);
  } catch(e) {
    console.log(e);
  }
}

app.get('/get-spotify-token', getSpotifyToken);

app.listen(3001, () => console.log('listening on 3001'));
