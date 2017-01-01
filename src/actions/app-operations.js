import SpotifyWebApi from 'spotify-web-api-js';
import FileSaver from 'file-saver';

import token from '../token';

const appOps = {
  getTracksFromSpotify: function(list, ids) {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);
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
    this.setState({ showImport: !this.state.showImport });
  },
  removeDuplicates: function(tracks) {
    const allTracks = this.state.set.concat(this.state.reserve);

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

    for(let list in state) {
      stringToWrite += (list === CONSTANTS.SET) ? 'Set:\n' : 'Reserve:\n';

      for(let track in state[list]) {
        stringToWrite += convertTrackToString(state[list][track]);
      }
    };

    const blob = new Blob([stringToWrite], {type: "text/plain;charset=utf-8"});

    FileSaver.saveAs(blob, 'setlist.txt');
  },
  storeAndSetTracksState: function(list, tracks) {
    localStorage.setItem(list, JSON.stringify(tracks));
    this.setState({ [list]: tracks });
  },
  parseidsFromInput: function(input) {
    const URIList = input.split('\n');
    const filteredURIList = URIList.filter(URI => URI !== '');
    const ids = filteredURIList.map(URI => URI.split(':')[2]);

    return ids;
  }
}

export default appOps;
