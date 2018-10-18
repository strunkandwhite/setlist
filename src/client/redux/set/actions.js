import {
  ADD_TRACK_TO_SET,
  REMOVE_TRACK_FROM_SET,
  INSERT_TRACK_TO_SET,
  CHANGE_SET_MAX_DURATION,
  CHANGE_SET_NAME,
  ADD_SET,
  REMOVE_SET,
} from './types'

export const addTrackToList = (trackId, setId) => ({ type: ADD_TRACK_TO_SET, trackId, setId })

export const removeTrackFromList = (trackId, setId) => ({ type: REMOVE_TRACK_FROM_SET, trackId, setId })

export const insertTrackToList = (trackId, setId, position) => ({
  type: INSERT_TRACK_TO_SET,
  trackId,
  setId,
  position,
})

export const changeSetName = (setId, name) => ({
  type: CHANGE_SET_NAME,
  setId,
  name,
})

export const changeSetMaxDuration = (setId, maxDuration) => ({
  type: CHANGE_SET_MAX_DURATION,
  setId,
  maxDuration,
})

export const addSet = () => ({ type: ADD_SET })

export const removeSet = (setId) => ({ type: REMOVE_SET, setId })
