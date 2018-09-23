import { combineReducers } from 'redux'

import { denormalizeTracks } from 'Client/helpers'

import { REQUEST_TRACKS, RECEIVE_TRACKS, CHANGE_TRACK_BPM } from './types'

const fetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_TRACKS:
      return true
    case RECEIVE_TRACKS:
      return false
    default:
      return state
  }
}

const tracks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRACKS:
      return Object.assign({}, denormalizeTracks(action.json.tracks), state)
    case CHANGE_TRACK_BPM:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          bpm: action.bpm,
        },
      }
    default:
      return state
  }
}

export default combineReducers({
  tracks,
  fetching,
})
