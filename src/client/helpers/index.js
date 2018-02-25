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
