const handlers = {
  handleSubmitImportForm: function(formInput, list) {
    const ids = this.parseidsFromInput(formInput)
    this.getTracksFromSpotify(ids, list);
  },
  handleChangeTrackBPM: function(index, list, id, input) {
    this.changeTrackBPM(index, list, id, input);
  },
  handleRemoveTrack: function(index, list) {
    this.removeTrack(index, list);
  },
  handleRemoveAllTracks: function(list) {
    this.removeAllTracks(list);
  },
  handleSwitchTrack: function(index, list) {
    this.switchTrack(index, list);
  },
  handleAddSpacer: function(list) {
    const dummyTrack = Object.assign({ id: Moment().format('x') }, CONSTANTS.DUMMY_TRACK)
    this.addTracks([dummyTrack], list);
  }
}

export default handlers;
