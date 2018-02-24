import SpotifyWebApi from 'spotify-web-api-js';
import FileSaver from 'file-saver';
import update from 'immutability-helper';

import CONSTANTS from '../constants';

const appOps = {
  getTracksFromSpotify: async function(list, ids) {
    const response = await fetch('http://localhost:3001/get-spotify-token');
    const responseJSON = await response.json();
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(responseJSON.token);
    spotify.getTracks(ids, (err, data) => {
      if (err) console.error(err);
      else {
        const newTracks = this.removeDuplicates(data.tracks);
        const slimTracks = this.slimTracks(newTracks);
        this.addTracks(list, slimTracks);
      }
    });
  },
  toggleImportForm: function() {
    const newState = update(this.state, {
      showImport: (showImport) => !showImport
    });

    this.setState(newState);
  },
  removeDuplicates: function(tracks) {
    const allTracks = this.state.lists.set.tracks.concat(this.state.lists.reserve.tracks);

    return tracks.filter(newTrack => allTracks.filter(oldTrack => oldTrack.id === newTrack.id).length === 0);
  },
  slimTracks: function(tracks) {
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
  },
  exportTracks: function() {
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

    for(let list in state.lists) {
      stringToWrite += list[0].toUpperCase() + list.slice(1) + '\n';

      for(let track in state.lists[list].tracks) {
        stringToWrite += convertTrackToString(state.lists[list].tracks[track]);
      }
    };

    const blob = new Blob([stringToWrite], {type: "text/plain;charset=utf-8"});

    FileSaver.saveAs(blob, 'setlist.txt');
  },
  parseidsFromInput: function(input) {
    return input.trim().split('\n').map(URI => URI.split(':')[2]);
  }
}

export default appOps;
