import { combineReducers } from 'redux'

import { ADD_TRACK_TO_LIST, REMOVE_TRACK_FROM_LIST, INSERT_TRACK_TO_LIST } from './types'

const lists = (
  state = {
    0: {
      maxDuration: '1:00:00',
      tracks: [],
      name: 'set 1',
    },
  },
  action,
) => {
  switch (action.type) {
    case ADD_TRACK_TO_LIST:
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tracks: [...state[action.listId].tracks, action.trackId],
        },
      }
    case REMOVE_TRACK_FROM_LIST: {
      const trackIndex = state[action.listId].tracks.indexOf(action.trackId)
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tracks: [
            ...state[action.listId].tracks.slice(0, trackIndex),
            ...state[action.listId].tracks.slice(trackIndex + 1),
          ],
        },
      }
    }
    case INSERT_TRACK_TO_LIST: {
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tracks: [
            ...state[action.listId].tracks.slice(0, action.position),
            action.trackId,
            ...state[action.listId].tracks.slice(action.position),
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
