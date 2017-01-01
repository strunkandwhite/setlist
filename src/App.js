import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { flow } from 'lodash';

import ImportForm from './ImportForm';
import TrackList from './TrackList';

import handlers from './actions/handlers';
import trackOps from './actions/track-operations';
import appOps from './actions/app-operations';

import CONSTANTS from './constants';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      set: [],
      reserve: [],
      showImport: true
    }

    //Handlers
    this.handleImportFormSubmit = handlers.handleImportFormSubmit.bind(this);
    this.handleTrackBPMChange = handlers.handleTrackBPMChange.bind(this);
    this.handleRemoveTrackClick = handlers.handleRemoveTrackClick.bind(this);
    this.handleRemoveAllTracksClick = handlers.handleRemoveAllTracksClick.bind(this);
    this.handleSwitchTrackClick = handlers.handleSwitchTrackClick.bind(this);
    this.handleAddSpacerClick = handlers.handleAddSpacerClick.bind(this);

    //Track operations
    this.addTracks = trackOps.addTracks.bind(this);
    this.removeTrack = trackOps.removeTrack.bind(this);
    this.removeAllTracks = trackOps.removeAllTracks.bind(this);
    this.moveTrack = trackOps.moveTrack.bind(this);
    this.switchTrack = trackOps.switchTrack.bind(this);
    this.changeTrackBPM = trackOps.changeTrackBPM.bind(this);

    //App operations
    this.getTracksFromSpotify = appOps.getTracksFromSpotify.bind(this);
    this.toggleImportForm = appOps.toggleImportForm.bind(this);
    this.removeDuplicates = appOps.removeDuplicates.bind(this);
    this.slimTracks = appOps.slimTracks.bind(this);
    this.exportTracks = appOps.exportTracks.bind(this);
    this.storeAndSetTracksState = appOps.storeAndSetTracksState.bind(this);
    this.parseidsFromInput = appOps.parseidsFromInput.bind(this);
  }

  componentWillMount() {
    const cachedSet = JSON.parse(localStorage.getItem(CONSTANTS.LISTS.SET));
    const cachedReserve = JSON.parse(localStorage.getItem(CONSTANTS.LISTS.RESERVE));

    if(cachedSet && cachedSet.length > 0) {
      this.setState({ set: cachedSet });
    }

    if(cachedReserve && cachedReserve.length > 0) {
      this.setState({ reserve: cachedReserve });
    }
  }

  render() {
    const { showImport } = this.state;
    const importForm = showImport ? <ImportForm handleImportFormSubmit={this.handleImportFormSubmit} /> : null;
    const selector = `App ${showImport ? 'show' : 'hide'}-import-form`;

    return (
      <div className={selector}>
        {importForm}
        {[CONSTANTS.LISTS.SET, CONSTANTS.LISTS.RESERVE].map(list => (
          <TrackList
            key={list}
            list={list}
            tracks={this.state[list]}
            handleTrackBPMChange={this.handleTrackBPMChange}
            handleRemoveTrackClick={this.handleRemoveTrackClick}
            handleRemoveAllTracksClick={this.handleRemoveAllTracksClick}
            handleAddSpacerClick={this.handleAddSpacerClick}
            handleSwitchTrackClick={this.handleSwitchTrackClick}
            moveTrack={this.moveTrack}
          />
        ))}
        <button onClick={this.exportTracks} className='export'>Export</button>
        <button onClick={this.toggleImportForm} className='toggle-import-form'>Toggle Import Form</button>
      </div>
    );
  }
}

export default flow(
  DragDropContext(HTML5Backend)
)(App);
