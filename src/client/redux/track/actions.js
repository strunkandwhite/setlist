import { SPOTIFY_TRACKS_URL } from 'Client/consts'
import { authActions } from 'Client/redux/auth'
import { listActions } from 'Client/redux/list'

import { REQUEST_TRACKS, RECEIVE_TRACKS, CHANGE_TRACK_BPM } from './types'

function checkStatus(response) {
  if (response.ok) return response
  const error = new Error(`API error: ${response.status}`)
  error.response = response
  return Promise.reject(error)
}

export const requestTracks = () => ({ type: REQUEST_TRACKS })

export const receiveTracks = (json) => ({ type: RECEIVE_TRACKS, json })

export const changeTrackBpm = (trackId, bpm) => ({ type: CHANGE_TRACK_BPM, trackId, bpm })

export const importTracks = (joinedIds) => (dispatch, getState) => {
  dispatch(requestTracks())
  dispatch(authActions.authorize()).then(() =>
    fetch(`${SPOTIFY_TRACKS_URL}${joinedIds}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
      .then(checkStatus)
      .then((r) => r.json())
      .then((json) => {
        dispatch(receiveTracks(json))
        json.tracks.forEach((track) => {
          dispatch(listActions.addTrackToList(track.id, 'set'))
        })
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line no-console
      }),
  )
}
