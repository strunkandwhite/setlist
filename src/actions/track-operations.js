import update from 'immutability-helper';
import Moment from 'moment';

import CONSTANTS from '../constants';

const trackOps = {
  addTracks: function(tracks, list) {
    const mergedTracks = update(this.state[list], {
      $push: tracks
    });

    this.storeAndSetTracksState(mergedTracks, list);
  },
  removeTrack: function(index, list) {
    const filteredTracks = update(this.state[list], {
      $splice: [[index, 1]]
    });

    this.storeAndSetTracksState(filteredTracks, list);
  },
  removeAllTracks: function(list) {
    const emptyTracks = [];

    this.storeAndSetTracksState(emptyTracks, list)
  },
  moveTrack: function(dragIndex, hoverIndex, list) {
    const dragTrack = this.state[list][dragIndex]
    const modifiedTracks = update(this.state[list], {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragTrack]],
    });

    this.storeAndSetTracksState(modifiedTracks, list)
  },
  switchTrack: function(index, list) {
    const otherList = (list === CONSTANTS.LISTS.SET) ? CONSTANTS.LISTS.RESERVE : CONSTANTS.LISTS.SET;
    const trackToMove = this.state[list][index];

    this.removeTrack(index, list);
    this.addTracks([trackToMove], otherList);
  },
  changeTrackBPM: function(index, list, id, input) {
    const modifiedTracks = update(this.state[list], {
      [index]: {
        bpm: {$set: input}
      }
    });

    localStorage.setItem(id, input);

    this.storeAndSetTracksState(modifiedTracks, list);
  }
}

export default trackOps;
