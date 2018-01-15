import update from 'immutability-helper';
import CONSTANTS from '../constants';

const applyDuration = (obj, list) => update(obj, {
  lists: {
    [list]: {
      duration: () => obj.lists[list].tracks.map(t => t.duration_ms).reduce((acc, val) => acc + val, 0)
    }
  }
});

const trackOps = {
  addTracks: function(list, tracks) {
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            $push: tracks
          },
        }
      }
    });

    const newStateWithDuration = applyDuration(newState, list)
    this.storeAndSetState(newStateWithDuration);
  },
  removeTrack: function(list, index) {
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            $splice: [[index, 1]]
          }
        }
      }
    });

    const newStateWithDuration = applyDuration(newState, list)
    this.storeAndSetState(newStateWithDuration);
  },
  removeAllTracks: function(list) {
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            $set: []
          }
        }
      }
    });

    const newStateWithDuration = applyDuration(newState, list)
    this.storeAndSetState(newStateWithDuration);
  },
  moveTrack: function(list, dragIndex, hoverIndex) {
    const dragTrack = this.state.lists[list].tracks[dragIndex];
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragTrack]],
          }
        }
      }
    });

    this.storeAndSetState(newState)
  },
  switchTrack: function(list, index) {
    const otherList = (list === CONSTANTS.LISTS.SET) ? CONSTANTS.LISTS.RESERVE : CONSTANTS.LISTS.SET;
    const trackToMove = [this.state.lists[list].tracks[index]];
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            $splice: [[index, 1]]
          }
        },
        [otherList]: {
          tracks: {
            $push: trackToMove
          }
        }
      }
    });

    const newStateWithDuration = applyDuration(newState, list)
    const newStateWithOtherDuration = applyDuration(newStateWithDuration, otherList)
    this.storeAndSetState(newStateWithOtherDuration);
  },
  changeTrackBPM: function(list, index, id, input) {
    const newState = update(this.state, {
      lists: {
        [list]: {
          tracks: {
            [index]: {
              bpm: {$set: input}
            }
          }
        }
      }
    });

    localStorage.setItem(id, input);
    this.storeAndSetState(newState);
  },
  storeAndSetState: function(state) {
    localStorage.setItem('state', JSON.stringify(state));
    this.setState(state);
  }
}

export default trackOps;
