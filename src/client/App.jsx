import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { flow } from 'lodash';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions'

import SetlistBuilder from './SetlistBuilder';
import TrackList from './TrackList';
import ImportForm from './ImportForm';

import handlers from './actions/handlers';
import trackOps from './actions/track-operations';
import appOps from './actions/app-operations';

import setlistApp from './reducers';

import CONSTANTS from './constants';

import './App.css';

const mapStateToProps = state => {
  return {
    showImport: state.showImport
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleImportForm: () => {
      dispatch({type: actions.TOGGLE_IMPORT_FORM});
    }
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetlistBuilder);

export default App;
