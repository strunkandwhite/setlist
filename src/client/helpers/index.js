import FileSaver from 'file-saver'

export const storeTempoLocally = (id, value) => {
  localStorage.setItem(id, value)
}

export const parseIds = (input) =>
  input
    .trim()
    .split('\n')
    .map((URI) => URI.split(':')[2])

export const normalizeLists = (lists) => Object.entries(lists).map(([id, list]) => ({ id, ...list }))

/* eslint-disable no-param-reassign,camelcase */
export const transformTrack = ({ artists, duration_ms, tempo, name, id }) => ({
  artist: artists[0].name,
  durationMs: duration_ms,
  tempo: localStorage.getItem(id) || Math.round(tempo).toString(),
  name,
  id,
})

export const exportToText = (state) => () => {
  const stringToWrite = Object.entries(state.lists.lists).reduce((str, [listName, list]) => {
    str += `${listName[0].toUpperCase()}${listName.slice(1)}\n`

    str += list.tracks.reduce((tracksStr, track) => {
      const { artist, name, tempo } = state.tracks.tracks[track]
      return `${tracksStr}[${tempo}] ${artist} - ${name}\n`
    }, '')

    return str
  }, '')

  const blob = new Blob([stringToWrite], { type: 'text/plain;charset=utf-8' })

  FileSaver.saveAs(blob, 'setlist.txt')
}
/* eslint-enable no-param-reassign,camelcase */
