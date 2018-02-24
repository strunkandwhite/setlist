import Moment from 'moment';
import CONSTANTS from '../constants';

const handlers = {
  //ADD_TRACK
  handleImportFormSubmit: function(list, input) {
    const ids = this.parseidsFromInput(input)
    this.getTracksFromSpotify(list, ids);
  },
  //CHANGE_TRACK_BPM
  handleTrackBPMChange: function(list, index, id, e) {
    const input = e.target.value;
    const letters = /[a-zA-Z]/;

    if(input.length > 3) return;
    if(letters.test(input)) return;

    this.changeTrackBPM(list, index, id, input);
  },
  //REMOVE_TRACK
  handleRemoveTrackClick: function(list, index) {
    this.removeTrack(list, index);
  },
  //REMOVE_ALL_TRACKS
  handleRemoveAllTracksClick: function(list) {
    this.removeAllTracks(list);
  },
  //TODO
  handleSwitchTrackClick: function(list, index) {
    this.switchTrack(list, index);
  },
  //TODO
  handleAddSpacerClick: function(list) {
    const dummyTrack = Object.assign({ id: Moment().format('x') }, CONSTANTS.DUMMY_TRACK)
    this.addTracks(list, [dummyTrack]);
  }
}

export default handlers;
