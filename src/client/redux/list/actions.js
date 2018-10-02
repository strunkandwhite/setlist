import { ADD_TRACK_TO_LIST, REMOVE_TRACK_FROM_LIST, INSERT_TRACK_TO_LIST } from './types'

export const addTrackToList = (trackId, listId) => ({ type: ADD_TRACK_TO_LIST, trackId, listId })

export const removeTrackFromList = (trackId, listId) => ({ type: REMOVE_TRACK_FROM_LIST, trackId, listId })

export const insertTrackToList = (trackId, listId, position) => ({
  type: INSERT_TRACK_TO_LIST,
  trackId,
  listId,
  position,
})
