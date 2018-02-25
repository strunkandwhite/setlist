import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeTrackBpm, removeTrackFromList } from '../actions';
import Moment from 'moment';
import 'moment-duration-format';

import '../styles/Track.css';

let Track = ({ id, artist, name, duration_ms, bpm, list, dispatch }) => {
  let input;
  const handleChange = e => {
    e.preventDefault();
    const value = input.value;
    const letters = /[a-zA-Z]/;

    if(value.length > 3) return;
    if(letters.test(value)) return;

    dispatch(changeTrackBpm(id, value));
  };

  return (
    <li className={`Track`}>
      <input
        placeholder='bpm'
        className='bpm'
        type='text'
        value={bpm}
        ref={node => {input = node}}
        onChange={handleChange}
      />
      <span>({Moment.duration(duration_ms).format('m:ss')}) {artist} - {name}</span>
      <button onClick={() => {}}>></button>
      <button onClick={() => {dispatch(removeTrackFromList(id, list))}}>x</button>
    </li>
  );
}

Track.propTypes = {
  id: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  bpm: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  duration_ms: PropTypes.number.isRequired
};

Track = connect()(Track);

export default Track;
