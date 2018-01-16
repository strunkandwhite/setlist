import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { flow } from 'lodash';

import TrackList from './TrackList';
import ImportForm from './ImportForm';

import handlers from './actions/handlers';
import trackOps from './actions/track-operations';
import appOps from './actions/app-operations';

import CONSTANTS from './constants';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showImport: true,
      lists: (() => {
        let obj = {};
        [CONSTANTS.LISTS.SET, CONSTANTS.LISTS.RESERVE].forEach(list => (
          obj[list] = {
            tracks: [],
            duration: 0,
            maxDuration: 0
          }
        ));

        return obj;
      })()
    };

    [handlers, appOps, trackOps].forEach(set => {
      for(let func in set) {
        this[func] = set[func].bind(this);
      }
    });

    this.outputImportForm = this.outputImportForm.bind(this);
  }

  componentWillMount() {
    const cachedState = JSON.parse(localStorage.getItem('state'));

    if(cachedState) {
      this.setState(cachedState);
    }
  }

  outputImportForm() {
    return this.state.showImport ? <ImportForm handleImportFormSubmit={this.handleImportFormSubmit} /> : null;
  }

  render() {
    return (
      <div className={`App ${this.state.showImport ? 'show' : 'hide'}-import-form`}>
        {this.outputImportForm()}
        {[CONSTANTS.LISTS.SET, CONSTANTS.LISTS.RESERVE].map(list => (
          <TrackList
            key={list}
            list={list}
            tracks={this.state.lists[list].tracks}
            handleTrackBPMChange={this.handleTrackBPMChange}
            handleRemoveTrackClick={this.handleRemoveTrackClick}
            handleRemoveAllTracksClick={this.handleRemoveAllTracksClick}
            handleAddSpacerClick={this.handleAddSpacerClick}
            handleSwitchTrackClick={this.handleSwitchTrackClick}
            moveTrack={this.moveTrack}
            duration={this.state.lists[list].duration}
            maxDuration={this.state.lists[list].maxDuration}
            buttonDir={list === CONSTANTS.LISTS.SET ? '>' : '<'}
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
