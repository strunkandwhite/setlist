export const IMPORT_TRACKS = 'IMPORT_TRACKS';
export const REQUEST_TRACKS = 'REQUEST_TRACKS';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const ADD_TRACK = 'ADD_TRACK';
export const ADD_TRACK_TO_LIST = 'ADD_TRACK_TO_LIST';
export const CHANGE_TRACK_BPM = 'CHANGE_TRACK_BPM';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const REMOVE_TRACK_FROM_LIST = 'REMOVE_TRACK_FROM_LIST';
export const REMOVE_ALL_TRACKS = 'REMOVE_ALL_TRACKS';
export const TOGGLE_IMPORT_FORM = 'TOGGLE_IMPORT_FORM';

export const importTracks = input => ({ type: IMPORT_TRACKS, input });
export const requestTracks = input => ({ type: REQUEST_TRACKS, input });
export const receiveTracks = response => ({ type: RECEIVE_TRACKS, response });
export const addTrack = track => ({ type: ADD_TRACK, track });
export const addTrackToList = (trackId, listId) => ({ type: ADD_TRACK_TO_LIST, trackId, listId });
export const changeTrackBPM = (trackId, bpm) => ({ type: CHANGE_TRACK_BPM, trackId, bpm });
export const removeTrack = trackId => ({ type: REMOVE_TRACK, trackId });
export const removeTrackFromList = trackId => ({ type: REMOVE_TRACK_FROM_LIST, trackId });
