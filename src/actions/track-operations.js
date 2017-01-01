import update from 'immutability-helper';
import Moment from 'moment';

import CONSTANTS from '../constants';

const trackOps = {
  addTracks: function(list, tracks) {
    const mergedTracks = update(this.state[list], {
      $push: tracks
    });

    this.storeAndSetTracksState(list, mergedTracks);
  },
  removeTrack: function(list, index) {
    const filteredTracks = update(this.state[list], {
      $splice: [[index, 1]]
    });

    this.storeAndSetTracksState(list, filteredTracks);
  },
  removeAllTracks: function(list) {
    const emptyTracks = [];

    this.storeAndSetTracksState(list, emptyTracks)
  },
  moveTrack: function(list, dragIndex, hoverIndex) {
    const dragTrack = this.state[list][dragIndex];
    const modifiedTracks = update(this.state[list], {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragTrack]],
    });

    this.storeAndSetTracksState(list, modifiedTracks)
  },
  switchTrack: function(list, index) {
    const otherList = (list === CONSTANTS.LISTS.SET) ? CONSTANTS.LISTS.RESERVE : CONSTANTS.LISTS.SET;
    const trackToMove = this.state[list][index];

    this.removeTrack(list, index);
    this.addTracks(otherList, [trackToMove]);
  },
  changeTrackBPM: function(list, index, id, input) {
    const modifiedTracks = update(this.state[list], {
      [index]: {
        bpm: {$set: input}
      }
    });

    localStorage.setItem(id, input);

    this.storeAndSetTracksState(list, modifiedTracks);
  }
}

export default trackOps;
