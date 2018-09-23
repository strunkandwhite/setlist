/* eslint-disable no-console */

require('dotenv').config()

const express = require('express')
const axios = require('axios')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => res.send('ok'))
app.get('/get-spotify-token', (req, res) => {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      Authorization: `Basic ${process.env.SPOTIFY_API_SECRET}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      res.send({ token: response.data.access_token })
    })
    .catch((error) => {
      res.send({ error: error.response.data.error, error_description: error.response.data.error_description })
    })
})

if (!module.parent) {
  const port = process.env.NODE_ENV === 'test' ? 3002 : 3001
  app.listen(port, () => console.log(`listening on ${port}`))
}

module.exports = app
