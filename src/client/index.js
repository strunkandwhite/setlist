import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import setlistApp from './reducers';
import App from './containers/App';

import './styles/App.css';
import './styles/ImportForm.css'
import './styles/TrackList.css';
import './styles/Track.css';

const store = createStore(
  setlistApp,
  applyMiddleware(
    thunkMiddleware
  )
);

//testing only!
window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
