import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import setlistApp from './reducers';
import App from './App';

const store = createStore(
  setlistApp,
  applyMiddleware(
    thunkMiddleware
  )
);

window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
