import Moment from 'moment';
import CONSTANTS from '../constants';

const handlers = {
  handleImportFormSubmit: function(list, input) {
    const ids = this.parseidsFromInput(input)
    this.getTracksFromSpotify(list, ids);
  },
  handleTrackBPMChange: function(list, index, id, input) {
    this.changeTrackBPM(list, index, id, input);
  },
  handleRemoveTrackClick: function(list, index) {
    this.removeTrack(list, index);
  },
  handleRemoveAllTracksClick: function(list) {
    this.removeAllTracks(list);
  },
  handleSwitchTrackClick: function(list, index) {
    this.switchTrack(list, index);
  },
  handleAddSpacerClick: function(list) {
    const dummyTrack = Object.assign({ id: Moment().format('x') }, CONSTANTS.DUMMY_TRACK)
    this.addTracks(list, [dummyTrack]);
  }
}

export default handlers;
