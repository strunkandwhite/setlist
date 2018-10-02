import { SPOTIFY_TOKEN_URL, AUTH_TOKEN_LOCAL_STORAGE_KEY, AUTH_TOKEN_EXPIRES_LOCAL_STORAGE_KEY } from 'Client/consts'
import { storeAuthToken } from 'Client/helpers'

import { RECEIVE_AUTH, REQUEST_AUTH } from './types'

export const requestAuth = () => ({ type: REQUEST_AUTH })

export const receiveAuth = (token) => ({ type: RECEIVE_AUTH, token })

export const authorize = () => (dispatch) => {
  dispatch(requestAuth())
  const authPromise = new Promise((resolve) => {
    if (
      localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY) &&
      new Date().getTime() < localStorage.getItem(AUTH_TOKEN_EXPIRES_LOCAL_STORAGE_KEY)
    ) {
      resolve(localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY))
    } else {
      fetch(SPOTIFY_TOKEN_URL)
        .then((response) => response.json())
        .then((json) => {
          const { token } = json
          storeAuthToken(token)
          resolve(token)
        })
    }
  })
  return authPromise
    .then((token) => {
      dispatch(receiveAuth(token))
    })
    .catch((error) => {
      throw new Error(error)
    })
}
