import * as actions from './actions'
import { combineReducers } from 'redux'

const showImport = (state = true, action) => {
  switch(action.type) {
    case actions.TOGGLE_IMPORT_FORM:
      return !state;
    default:
      return state;
  }
}

const tracks = (state = [], action) => {
  switch(action.type) {
    case actions.IMPORT_TRACKS:
      return ['foo'];
    default:
      return state;
  }
}

const setlistApp = combineReducers({
  showImport,
  tracks
});

export default setlistApp;
