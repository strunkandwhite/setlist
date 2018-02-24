export const parseIds = input => input.trim().split('\n').map(URI => URI.split(':')[2])

export const formatTracks = tracks => tracks.reduce((collection, {artists, name, id, duration_ms}) => {
  collection[id] = {
    artist: artists[0].name,
    name,
    duration_ms,
    bpm: localStorage.getItem(id) || ''
  };
  return collection;
}, {});
