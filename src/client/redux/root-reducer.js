import { combineReducers } from 'redux'

import { authReducer } from './auth'
import { trackReducer } from './track'
import { setReducer } from './set'

export default combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  sets: setReducer,
})
