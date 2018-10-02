import FileSaver from 'file-saver'

import { AUTH_TOKEN_LOCAL_STORAGE_KEY, AUTH_TOKEN_EXPIRES_LOCAL_STORAGE_KEY } from 'Client/consts'

export const storeTempoLocally = (id, value) => {
  localStorage.setItem(id, value)
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
export const transformTrack = ({ artists, duration_ms, tempo, name, id }) => ({
  artist: artists[0].name,
  durationMs: duration_ms,
  tempo: localStorage.getItem(id) || Math.round(tempo).toString(),
  name,
  id,
})

export const exportToText = (state) => () => {
  const stringToWrite = Object.entries(state.sets.sets).reduce((str, [setName, set]) => {
    str += `${setName[0].toUpperCase()}${setName.slice(1)}\n`

    str += set.tracks.reduce((tracksStr, track) => {
      const { artist, name, tempo } = state.tracks.tracks[track]
      return `${tracksStr}[${tempo}] ${artist} - ${name}\n`
    }, '')

    return str
  }, '')

  const blob = new Blob([stringToWrite], { type: 'text/plain;charset=utf-8' })

  FileSaver.saveAs(blob, 'setlist.txt')
}
/* eslint-enable no-param-reassign,camelcase */
