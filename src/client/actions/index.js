import 'isomorphic-fetch';

export const SPOTIFY_TOKEN_URL = 'http://localhost:3001/get-spotify-token';
export const SPOTIFY_TRACKS_URL = 'https://api.spotify.com/v1/tracks/?ids=';

export const AUTHORIZE = 'AUTHORIZE';
export const authorize = () => {
  return dispatch => {
    dispatch(requestAuth());
    return fetch(SPOTIFY_TOKEN_URL).then(
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
export const importTracks = joinedIds => {
  return (dispatch, getState) => {
    dispatch(requestTracks());
    dispatch(authorize()).then(
      () => {
        dispatch(requestTracks());
        return fetch(SPOTIFY_TRACKS_URL + joinedIds, {
          headers: {
            'Authorization': `Bearer ${getState().spotifyToken}`
          }
        }).then(
          response => response.json(),
          error => console.log(error)
        ).then(
          json => {
            dispatch(receiveTracks(json));
            json.tracks.forEach(track => {
              dispatch(addTrackToList(track.id, 'set'));
            });
          }
        );
      }
    );
  }
}

export const REQUEST_TRACKS = 'REQUEST_TRACKS';
export const requestTracks = () => ({ type: REQUEST_TRACKS });

export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const receiveTracks = json => ({ type: RECEIVE_TRACKS, json });

export const ADD_TRACK_TO_LIST = 'ADD_TRACK_TO_LIST';
export const addTrackToList = (trackId, list) => ({ type: ADD_TRACK_TO_LIST, trackId, list });

export const CHANGE_TRACK_BPM = 'CHANGE_TRACK_BPM';
export const changeTrackBpm = (trackId, bpm) => ({ type: CHANGE_TRACK_BPM, trackId, bpm });

export const REMOVE_TRACK_FROM_LIST = 'REMOVE_TRACK_FROM_LIST';
export const removeTrackFromList = (trackId, list) => ({ type: REMOVE_TRACK_FROM_LIST, trackId, list });

export const TOGGLE_IMPORT_FORM = 'TOGGLE_IMPORT_FORM';
export const toggleImportForm = () => ({ type: TOGGLE_IMPORT_FORM });
