import fetch from 'cross-fetch';
import spotifyApi from 'spotify-web-api-js';
import { parseIds } from '../helpers'

const spotify = new spotifyApi();

export const AUTHORIZE = 'AUTHORIZE';
export const authorize = () => {
  return dispatch => {
    dispatch(requestAuth());
    return fetch('http://localhost:3001/get-spotify-token').then(
      response => response.json(),
      error => console.log(error)
    ).then(
      json => dispatch(receiveAuth(json))
    )
  }
}

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const requestAuth = () => ({ type: REQUEST_AUTH });

export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const receiveAuth = json => ({ type: RECEIVE_AUTH, json });

export const IMPORT_TRACKS = 'IMPORT_TRACKS';
export const importTracks = input => {
  return (dispatch, getState) => {
    dispatch(requestTracks());
    dispatch(authorize()).then(
      () => {
        dispatch(requestTracks());
        spotify.setAccessToken(getState().spotifyToken);
        return spotify.getTracks(parseIds(input), (error, data) => {
          if (error) console.error(error);
          else {
            dispatch(receiveTracks(data));
            data.tracks.forEach(track => {
              dispatch(addTrackToList(track.id, 'set'));
            });
          }
        });
      }
    );
  }
}

export const REQUEST_TRACKS = 'REQUEST_TRACKS';
export const requestTracks = () => ({ type: REQUEST_TRACKS });

export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const receiveTracks = data => ({ type: RECEIVE_TRACKS, data });

export const ADD_TRACK_TO_LIST = 'ADD_TRACK_TO_LIST';
export const addTrackToList = (trackId, list) => ({ type: ADD_TRACK_TO_LIST, trackId, list });

export const CHANGE_TRACK_BPM = 'CHANGE_TRACK_BPM';
export const changeTrackBPM = (trackId, bpm) => ({ type: CHANGE_TRACK_BPM, trackId, bpm });

export const REMOVE_TRACK = 'REMOVE_TRACK';
export const removeTrack = trackId => ({ type: REMOVE_TRACK, trackId });

export const REMOVE_TRACK_FROM_LIST = 'REMOVE_TRACK_FROM_LIST';
export const removeTrackFromList = trackId => ({ type: REMOVE_TRACK_FROM_LIST, trackId });

export const REMOVE_ALL_TRACKS = 'REMOVE_ALL_TRACKS';
export const TOGGLE_IMPORT_FORM = 'TOGGLE_IMPORT_FORM';
