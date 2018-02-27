import * as actions from './';

describe('action creators', () => {
  describe('requestAuth', () => {
    it('should create an action to request authorization', () => {
      const expectedAction = { type: actions.REQUEST_AUTH };
      expect(actions.requestAuth()).toEqual(expectedAction);
    });
  });

  describe('receiveAuth', () => {
    it('should create an action to receive authorization information', () => {
      const expectedAction = { type: actions.RECEIVE_AUTH, json: {} };
      expect(actions.receiveAuth({})).toEqual(expectedAction);
    });
  });

  describe('requestTracks', () => {
    it('should create an action to request tracks', () => {
      const expectedAction = { type: actions.REQUEST_TRACKS };
      expect(actions.requestTracks()).toEqual(expectedAction);
    });
  });

  describe('receiveTracks', () => {
    it('should create an action to request tracks', () => {
      const expectedAction = { type: actions.RECEIVE_TRACKS, data: {} };
      expect(actions.receiveTracks({})).toEqual(expectedAction);
    });
  });

  describe('addTrackToList', () => {
    it('should create an action to add a track to a list', () => {
      const expectedAction = { type: actions.ADD_TRACK_TO_LIST, trackId: 1, list: 'foo' };
      expect(actions.addTrackToList(1, 'foo')).toEqual(expectedAction);
    });
  });

  describe('changeTrackBpm', () => {
    it('should create an action to change a track\'s BPM', () => {
      const expectedAction = { type: actions.CHANGE_TRACK_BPM, trackId: 1, bpm: 666 };
      expect(actions.changeTrackBpm(1, 666)).toEqual(expectedAction);
    });
  });

  describe('removeTrackFromList', () => {
    it('should create an action to remove a track from a list', () => {
      const expectedAction = { type: actions.REMOVE_TRACK_FROM_LIST, trackId: 1, list: 'foo' };
      expect(actions.removeTrackFromList(1, 'foo')).toEqual(expectedAction);
    });
  });

  describe('toggleImportForm', () => {
    it('should create an action to toggle the import form', () => {
      const expectedAction = { type: actions.TOGGLE_IMPORT_FORM };
      expect(actions.toggleImportForm()).toEqual(expectedAction);
    });
  });
});
