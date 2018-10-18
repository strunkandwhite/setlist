import { combineReducers } from 'redux'
import { uniqueId } from 'lodash-es'

import {
  CHANGE_SET_NAME,
  CHANGE_SET_MAX_DURATION,
  ADD_TRACK_TO_SET,
  REMOVE_TRACK_FROM_SET,
  INSERT_TRACK_TO_SET,
  ADD_SET,
  REMOVE_SET,
} from './types'

const sets = (
  state = {
    0: {
      maxDuration: 3600000,
      tracks: [],
      name: 'set 1',
    },
  },
  action,
) => {
  switch (action.type) {
    case ADD_SET:
      return {
        ...state,
        [uniqueId()]: {
          maxDuration: 0,
          tracks: [],
          name: 'new set',
        },
      }
    case REMOVE_SET: {
      const { [action.setId]: setToRemove, ...rest } = state
      return {
        ...rest,
      }
    }
    case CHANGE_SET_NAME:
      return {
        ...state,
        [action.setId]: {
          ...state[action.setId],
          name: action.name,
        },
      }
    case CHANGE_SET_MAX_DURATION:
      return {
        ...state,
        [action.setId]: {
          ...state[action.setId],
          maxDuration: action.maxDuration,
        },
      }
    case ADD_TRACK_TO_SET:
      return {
        ...state,
        [action.setId]: {
          ...state[action.setId],
          tracks: [...state[action.setId].tracks, action.trackId],
        },
      }
    case REMOVE_TRACK_FROM_SET: {
      const trackIndex = state[action.setId].tracks.indexOf(action.trackId)
      return {
        ...state,
        [action.setId]: {
          ...state[action.setId],
          tracks: [
            ...state[action.setId].tracks.slice(0, trackIndex),
            ...state[action.setId].tracks.slice(trackIndex + 1),
          ],
        },
      }
    }
    case INSERT_TRACK_TO_SET: {
      return {
        ...state,
        [action.setId]: {
          ...state[action.setId],
          tracks: [
            ...state[action.setId].tracks.slice(0, action.position),
            action.trackId,
            ...state[action.setId].tracks.slice(action.position),
          ],
        },
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  sets,
})
