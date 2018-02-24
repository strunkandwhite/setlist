import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/Track.css';

let Track = ({ id }) => (
  <li className={`Track`}>
    <input
      placeholder='bpm'
      className='bpm'
      type='text'
    />
    <span>(0) {id}</span>
    <button onClick={() => {}}>></button>
    <button onClick={() => {}}>x</button>
  </li>
);

Track.propTypes = {
  id: PropTypes.string.isRequired
};

Track = connect()(Track);

export default Track;
