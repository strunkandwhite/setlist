import React from 'react';
import PropTypes from 'prop-types';

import '../styles/TrackList.css';

const TrackList = ({
  list,
  tracks,
  isTooLong,
  formattedDuration
}) => {
  const className = (isTooLong) ? 'duration too-long' : 'duration';

  return (
    <section className={`TrackList ${list}`}>
      <h3>
        {list}&nbsp;
        <span className={className}>
          ({formattedDuration})
        </span>
      </h3>
      <ul>
        {tracks.map((track, index) => (
          <span>{track}</span>
        ))}
      </ul>
    </section>
  )
};

TrackList.propTypes = {
  list: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  formattedDuration: PropTypes.string.isRequired,
  isTooLong: PropTypes.bool.isRequired
}

export default TrackList;
