import { combineReducers } from 'redux'

// import { formatTracks } from 'Client/helpers'

// const tracksByList = (state = { set: { tracks: [] }, reserve: { tracks: [] } }, action) => {
//   let trackIndex

//   switch (action.type) {
//     case ADD_TRACK_TO_LIST:
//       return {
//         ...state,
//         [action.list]: {
//           tracks: union([action.trackId], state[action.list].tracks),
//         },
//       }
//     case REMOVE_TRACK_FROM_LIST:
//       trackIndex = state[action.list].tracks.indexOf(action.trackId)
//       return {
//         ...state,
//         [action.list]: {
//           tracks: [
//             ...state[action.list].tracks.slice(0, trackIndex),
//             ...state[action.list].tracks.slice(trackIndex + 1),
//           ],
//         },
//       }
//     default:
//       return state
//   }
// }

const lists = (
  state = {
    set: {
      maxDuration: 0,
    },
    reserve: {
      maxDuration: 0,
    },
  },
) => state

export default combineReducers({
  lists,
})
