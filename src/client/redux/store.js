import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { loadState, saveState } from 'Client/helpers'

import rootReducer from './root-reducer'

const persistedState = loadState()

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk, createLogger())))

store.subscribe(() => {
  saveState(store.getState())
})

export default store
