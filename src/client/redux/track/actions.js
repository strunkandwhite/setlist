import { SPOTIFY_TRACKS_URL, SPOTIFY_FEATURES_URL } from 'Client/consts'
import { authActions } from 'Client/redux/auth'
import { listActions } from 'Client/redux/list'
import { transformTrack } from 'Client/helpers'

import { REQUEST_TRACKS, RECEIVE_TRACKS, CHANGE_TRACK_TEMPO } from './types'

// function checkStatus(response) {
//   if (response.ok) return response
//   const error = new Error(`API error: ${response.status}`)
//   error.response = response
//   return Promise.reject(error)
// }

export const requestTracks = () => ({ type: REQUEST_TRACKS })

export const receiveTracks = (tracks) => ({ type: RECEIVE_TRACKS, tracks })

export const changeTrackTempo = (trackId, tempo) => ({ type: CHANGE_TRACK_TEMPO, trackId, tempo })

export const importTracks = (joinedIds) => (dispatch, getState) => {
  dispatch(requestTracks())
  dispatch(authActions.authorize())
    .then(() => {
      const tracks = fetch(`${SPOTIFY_TRACKS_URL}${joinedIds}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      const features = fetch(`${SPOTIFY_FEATURES_URL}${joinedIds}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      return Promise.all([tracks, features])
    })
    // .then(checkStatus)
    .then((responses) => {
      const jsonResponses = responses.map((r) => r.json())
      return Promise.all(jsonResponses)
    })
    .then((jsons) => {
      const [{ tracks }, { audio_features: audioFeatures }] = jsons
      const mergedTracks = tracks.map((track, i) => {
        let mergedTrack = { ...track }
        if (track.id === audioFeatures[i].id) {
          mergedTrack = {
            ...track,
            ...audioFeatures[i],
          }
        }
        return mergedTrack
      })
      /* eslint-disable no-param-reassign,camelcase */
      const normalizedTracks = mergedTracks.reduce((collection, track) => {
        collection[track.id] = transformTrack(track)
        return collection
      }, {})
      dispatch(receiveTracks(normalizedTracks))
      Object.keys(normalizedTracks).forEach((id) => {
        dispatch(listActions.addTrackToList(id, 'set'))
      })
    })
    .catch((error) => {
      console.log(error) // eslint-disable-line no-console
    })
}
