import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import Moment from 'moment';
import FileSaver from 'file-saver';
import _ from 'lodash';

import ImportForm from './ImportForm';
import TrackList from './TrackList';
import CONSTANTS from './constants';
import token from './token';

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
    this.handleSubmitImportForm = this.handleSubmitImportForm.bind(this);
    this.handleChangeTrackBPM = this.handleChangeTrackBPM.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.handleRemoveAllTracks = this.handleRemoveAllTracks.bind(this);
    this.handleSwitchTrack = this.handleSwitchTrack.bind(this);
    this.handleAddSpacer = this.handleAddSpacer.bind(this);

    //Track operations
    this.addTracks = this.addTracks.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.removeAllTracks = this.removeAllTracks.bind(this);
    this.moveTrack = this.moveTrack.bind(this);
    this.switchTrack = this.switchTrack.bind(this);
    this.changeTrackBPM = this.changeTrackBPM.bind(this);

    //App operations
    this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
    this.toggleImportForm = this.toggleImportForm.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.slimTracks = this.slimTracks.bind(this);
    this.exportTracks = this.exportTracks.bind(this);
    this.storeAndSetTracksState = this.storeAndSetTracksState.bind(this);
    this.parseidsFromInput = this.parseidsFromInput.bind(this);
  }

  //Handlers
  handleSubmitImportForm(formInput, list) {
    const ids = this.parseidsFromInput(formInput)
    this.getTracksFromSpotify(ids, list);
  }

  handleChangeTrackBPM(index, list, id, input) {
    this.changeTrackBPM(index, list, id, input);
  }

  handleRemoveTrack(index, list) {
    this.removeTrack(index, list);
  }

  handleRemoveAllTracks(list) {
    this.removeAllTracks(list);
  }

  handleSwitchTrack(index, list) {
    this.switchTrack(index, list);
  }

  handleAddSpacer(list) {
    const dummyTrack = Object.assign({ id: Moment().format('x') }, CONSTANTS.DUMMY_TRACK)

    this.addTracks([dummyTrack], list);
  }

  //Track operations
  addTracks(tracks, list) {
    const mergedTracks = update(this.state[list], {
      $push: tracks
    });

    this.storeAndSetTracksState(mergedTracks, list);
  }

  removeTrack(index, list) {
    const filteredTracks = update(this.state[list], {
      $splice: [[index, 1]]
    });

    this.storeAndSetTracksState(filteredTracks, list);
  }

  removeAllTracks(list) {
    const emptyTracks = [];

    this.storeAndSetTracksState(emptyTracks, list)
  }

  moveTrack(dragIndex, hoverIndex, list) {
    const dragTrack = this.state[list][dragIndex]
    const modifiedTracks = update(this.state[list], {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragTrack]],
    });

    this.storeAndSetTracksState(modifiedTracks, list)
  }

  switchTrack(index, list) {
    const otherList = (list === CONSTANTS.LISTS.SET) ? CONSTANTS.LISTS.RESERVE : CONSTANTS.LISTS.SET;
    const trackToMove = this.state[list][index];

    this.removeTrack(index, list);
    this.addTracks([trackToMove], otherList);
  }

  changeTrackBPM(index, list, id, input) {
    const modifiedTracks = update(this.state[list], {
      [index]: {
        bpm: {$set: input}
      }
    });

    localStorage.setItem(id, input);

    this.storeAndSetTracksState(modifiedTracks, list);
  }

  //App operations
  getTracksFromSpotify(ids, list) {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);
    spotify.getTracks(ids, (err, data) => {
      if (err) console.error(err);
      else {
        const newTracks = this.removeDuplicates(data.tracks);
        const slimTracks = this.slimTracks(newTracks);
        this.addTracks(slimTracks, list);
      }
    });
  }

  toggleImportForm() {
    this.setState({ showImport: !this.state.showImport });
  }

  removeDuplicates(tracks) {
    const allTracks = this.state.set.concat(this.state.reserve);

    return tracks.filter(newTrack => allTracks.filter(oldTrack => oldTrack.id === newTrack.id).length === 0);
  }

  slimTracks(tracks) {
    return tracks.map(({ artists, name, id, duration_ms }) => (
      {
        artist: artists[0].name,
        name: name,
        id: id,
        duration_ms: duration_ms,
        bpm: localStorage.getItem(id) || '',
        type: CONSTANTS.TYPES.SONG
      }
    ));
  }

  exportTracks() {
    const { state } = this;
    const convertTrackToString = track => {
      const {
        artist,
        name,
        bpm,
        type
      } = track;

      return (type === CONSTANTS.TYPES.SONG) ? `[${bpm}] ${artist} - ${name}\n` : `${CONSTANTS.BREAK}\n`
    }

    let stringToWrite = '';

    for(let list in state) {
      stringToWrite += (list === CONSTANTS.SET) ? 'Set:\n' : 'Reserve:\n';

      for(let track in state[list]) {
        stringToWrite += convertTrackToString(state[list][track]);
      }
    };

    const blob = new Blob([stringToWrite], {type: "text/plain;charset=utf-8"});

    FileSaver.saveAs(blob, 'setlist.txt');
  }

  storeAndSetTracksState(tracks, list) {
    localStorage.setItem(list, JSON.stringify(tracks));
    this.setState({ [list]: tracks });
  }

  parseidsFromInput(formInput) {
    const URIList = formInput.split('\n');
    const filteredURIList = URIList.filter(URI => URI !== '');
    const ids = filteredURIList.map(URI => URI.split(':')[2]);

    return ids;
  }

  //Lifecyle methods
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
    const importForm = showImport ? <ImportForm handleSubmitImportForm={this.handleSubmitImportForm} /> : null;
    const selector = `App ${showImport ? 'show' : 'hide'}-import-form`;

    return (
      <div className={selector}>
        {importForm}
        {[CONSTANTS.LISTS.SET, CONSTANTS.LISTS.RESERVE].map(list => (
          <TrackList
            key={list}
            list={list}
            tracks={this.state[list]}
            handleChangeTrackBPM={this.handleChangeTrackBPM}
            handleRemoveTrack={this.handleRemoveTrack}
            handleRemoveAllTracks={this.handleRemoveAllTracks}
            handleAddSpacer={this.handleAddSpacer}
            handleSwitchTrack={this.handleSwitchTrack}
            moveTrack={this.moveTrack}
          />
        ))}
        <button onClick={this.exportTracks} className='export'>Export</button>
        <button onClick={this.toggleImportForm} className='toggle-import-form'>Toggle Import Form</button>
      </div>
    );
  }
}

export default _.flow(
  DragDropContext(HTML5Backend)
)(App);
