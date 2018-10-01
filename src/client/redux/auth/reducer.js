import { combineReducers } from 'redux'

import { REQUEST_AUTH, RECEIVE_AUTH } from './types'

export const fetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return true
    case RECEIVE_AUTH:
      return false
    default:
      return state
  }
}

export const authorized = (state = false, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return false
    case RECEIVE_AUTH:
      return true
    default:
      return state
  }
}

export const token = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_AUTH:
      return action.token
    default:
      return state
  }
}

export default combineReducers({
  fetching,
  authorized,
  token,
})
