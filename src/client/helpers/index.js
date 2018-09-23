import FileSaver from 'file-saver'

export const parseIds = (input) =>
  input
    .trim()
    .split('\n')
    .map((URI) => URI.split(':')[2])

export const normalizeLists = (lists) => Object.entries(lists).map(([id, list]) => ({ id, ...list }))

/* eslint-disable no-param-reassign */
export const formatTracks = (tracks) =>
  tracks.reduce((collection, { artists, name, id, durationMs }) => {
    collection[id] = {
      bpm: localStorage.getItem(id) || '',
      artist: artists[0].name,
      durationMs,
      name,
      id,
    }
    return collection
  }, {})

export const exportToText = (state) => () => {
  const stringToWrite = Object.entries(state.tracksByList).reduce((exportStr, [listName, list]) => {
    exportStr += `${listName[0].toUpperCase()}${listName.slice(1)}\n`

    exportStr += list.tracks.reduce((tracksStr, track) => {
      const { artist, name, bpm } = state.entities.tracks[track]
      return `${tracksStr}[${bpm}] ${artist} - ${name}\n`
    }, '')

    return exportStr
  })

  const blob = new Blob([stringToWrite], { type: 'text/plain;charset=utf-8' })

  FileSaver.saveAs(blob, 'setlist.txt')
}
/* eslint-enable no-param-reassign */
