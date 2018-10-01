import { combineReducers } from 'redux'

import { denormalizeTracks } from 'Client/helpers'

import { REQUEST_TRACKS, RECEIVE_TRACKS, CHANGE_TRACK_TEMPO } from './types'

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
      return Object.assign({}, denormalizeTracks(action.tracks), state)
    case CHANGE_TRACK_TEMPO:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          tempo: action.tempo,
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
