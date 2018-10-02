import { ADD_TRACK_TO_LIST, REMOVE_TRACK_FROM_LIST, INSERT_TRACK_TO_LIST } from './types'

export const addTrackToList = (trackId, list) => ({ type: ADD_TRACK_TO_LIST, trackId, list })

export const removeTrackFromList = (trackId, list) => ({ type: REMOVE_TRACK_FROM_LIST, trackId, list })

export const insertTrackToList = (trackId, list, position) => ({ type: INSERT_TRACK_TO_LIST, trackId, list, position })
