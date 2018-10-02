import { combineReducers } from 'redux'

import { ADD_TRACK_TO_LIST, REMOVE_TRACK_FROM_LIST, INSERT_TRACK_TO_LIST } from './types'

const lists = (
  state = {
    set: {
      maxDuration: '1:00:00',
      tracks: [],
    },
    reserve: {
      maxDuration: '',
      tracks: [],
    },
  },
  action,
) => {
  switch (action.type) {
    case ADD_TRACK_TO_LIST:
      return {
        ...state,
        [action.list]: {
          ...state[action.list],
          tracks: [...state[action.list].tracks, action.trackId],
        },
      }
    case REMOVE_TRACK_FROM_LIST: {
      const trackIndex = state[action.list].tracks.indexOf(action.trackId)
      return {
        ...state,
        [action.list]: {
          ...state[action.list],
          tracks: [
            ...state[action.list].tracks.slice(0, trackIndex),
            ...state[action.list].tracks.slice(trackIndex + 1),
          ],
        },
      }
    }
    case INSERT_TRACK_TO_LIST: {
      return {
        ...state,
        [action.list]: {
          ...state[action.list],
          tracks: [
            ...state[action.list].tracks.slice(0, action.position),
            action.trackId,
            ...state[action.list].tracks.slice(action.position),
          ],
        },
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  lists,
})
