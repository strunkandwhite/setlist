import FileSaver from 'file-saver'

import { AUTH_TOKEN_LOCAL_STORAGE_KEY, AUTH_TOKEN_EXPIRES_LOCAL_STORAGE_KEY } from 'Client/consts'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('setlist_state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('setlist_state', serializedState)
  } catch (err) {
    // no-op
  }
}

export const storeAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token)
  localStorage.setItem(AUTH_TOKEN_EXPIRES_LOCAL_STORAGE_KEY, new Date().getTime() + 3600000)
}

export const parseIds = (input) =>
  input
    .trim()
    .split('\n')
    .map((URI) => URI.split(':')[2])

export const normalizeLists = (sets) => Object.entries(sets).map(([id, set]) => ({ id, ...set }))

/* eslint-disable no-param-reassign,camelcase */
export const transformTrack = ({ artists, duration_ms, valence, tempo, name, id }) => ({
  artist: artists[0].name,
  durationMs: duration_ms,
  tempo: Math.round(tempo).toString(),
  valence: Math.round(valence * 100),
  name,
  id,
})

export const exportToText = (state) => () => {
  const stringToWrite = Object.values(state.sets.sets).reduce((str, set) => {
    const { name, tracks } = set
    str += `${name[0].toUpperCase()}${name.slice(1)}\n`

    str += tracks.reduce((tracksStr, track) => {
      const { artist, name: trackName, tempo } = state.tracks.tracks[track]
      return `${tracksStr}[${tempo}] ${artist} - ${trackName}\n`
    }, '')

    return str
  }, '')

  const blob = new Blob([stringToWrite], { type: 'text/plain;charset=utf-8' })

  FileSaver.saveAs(blob, 'setlist.txt')
}
/* eslint-enable no-param-reassign,camelcase */
