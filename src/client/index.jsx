import 'unfetch/polyfill'
import 'moment-duration-format'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from 'Client/redux/store'
import App from 'Client/App'

// testing only!
window.store = store

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
