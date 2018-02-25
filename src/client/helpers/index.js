import FileSaver from 'file-saver';

export const parseIds = input => input.trim().split('\n').map(URI => URI.split(':')[2])

export const formatTracks = tracks => tracks.reduce((collection, {artists, name, id, duration_ms}) => {
  collection[id] = {
    bpm: localStorage.getItem(id) || '',
    artist: artists[0].name,
    duration_ms,
    name,
    id
  };
  return collection;
}, {});

export const exportToText = state => () => {
  let stringToWrite = '';

  for(let list in state.tracksByList) {
    stringToWrite += list[0].toUpperCase() + list.slice(1) + '\n';

    stringToWrite = state.tracksByList[list].tracks.reduce((str, track) => {
      const { artist, name, bpm } = state.entities.tracks[track];
      return str += `[${bpm}] ${artist} - ${name}\n`;
    }, stringToWrite);
  };

  const blob = new Blob([stringToWrite], {type: "text/plain;charset=utf-8"});

  FileSaver.saveAs(blob, 'setlist.txt');
};
