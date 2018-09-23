import { SPOTIFY_TOKEN_URL } from 'Client/consts'

import { RECEIVE_AUTH, REQUEST_AUTH } from './types'

export const requestAuth = () => ({ type: REQUEST_AUTH })

export const receiveAuth = (json) => ({ type: RECEIVE_AUTH, json })

export const authorize = () => (dispatch) => {
  dispatch(requestAuth())
  return fetch(SPOTIFY_TOKEN_URL)
    .then((response) => response.json())
    .then((json) => dispatch(receiveAuth(json)))
    .catch((error) => {
      throw new Error(error)
    })
}
