import { combineReducers } from 'redux'

import { authReducer } from './auth'
import { trackReducer } from './track'
import { listReducer } from './list'

export default combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  lists: listReducer,
})
