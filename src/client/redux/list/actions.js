import { ADD_TRACK_TO_LIST, REMOVE_TRACK_FROM_LIST } from './types'

export const addTrackToList = (trackId, list) => ({ type: ADD_TRACK_TO_LIST, trackId, list })

export const removeTrackFromList = (trackId, list) => ({ type: REMOVE_TRACK_FROM_LIST, trackId, list })