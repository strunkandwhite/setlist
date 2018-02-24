import { combineReducers } from 'redux'
import {
  TOGGLE_IMPORT_FORM,
  REQUEST_AUTH,
  RECEIVE_AUTH,
  REQUEST_TRACKS,
  RECEIVE_TRACKS,
  ADD_TRACK_TO_LIST
} from '../actions'
import { formatTracks } from '../helpers'

const showImport = (state = true, action) => {
  switch(action.type) {
    case TOGGLE_IMPORT_FORM:
      return !state;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch(action.type) {
    case REQUEST_TRACKS:
    case REQUEST_AUTH:
      return true;
    case RECEIVE_TRACKS:
    case RECEIVE_AUTH:
      return false;
    default:
      return state;
  }
}

const isAuthorizedWithSpotify = (state = false, action) => {
  switch(action.type) {
    case REQUEST_AUTH:
      return false;
    case RECEIVE_AUTH:
      return true;
    default:
      return state;
  }
}

const spotifyToken = (state = '', action) => {
  switch(action.type) {
    case RECEIVE_AUTH:
      return action.json.token;
    default:
      return state;
  }
}

const tracks = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TRACKS:
      return Object.assign(state, formatTracks(action.data.tracks));
    default:
      return state;
  }
}

const lists = (
  state = {
    1: {
      name: 'set',
      maxDuration: 10
    },
    2: {
      name: 'reserve',
      maxDuration: 0
    }
  }) => state

const tracksByList = (state = {set: {tracks: []}, reserve: {tracks: []}}, action) => {
  switch(action.type) {
    case ADD_TRACK_TO_LIST:
      return {
        ...state,
        [action.list]: {
          tracks: [
            action.trackId,
            ...state[action.list].tracks
          ]
        }
      }
    default:
      return state;
  }
}

const entities = combineReducers({
  tracks,
  lists
});

const setlistApp = combineReducers({
  showImport,
  isFetching,
  isAuthorizedWithSpotify,
  spotifyToken,
  entities,
  tracksByList
});

export default setlistApp;
