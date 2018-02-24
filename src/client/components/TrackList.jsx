import React from 'react';
import PropTypes from 'prop-types';

import '../styles/TrackList.css';

const TrackList = ({
  name,
  tracks,
  isTooLong,
  formattedDuration
}) => {
  const className = (isTooLong) ? 'duration too-long' : 'duration';

  return (
    <section className={`TrackList ${name}`}>
      <h3>
        {name}&nbsp;
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
  name: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  formattedDuration: PropTypes.string.isRequired,
  isTooLong: PropTypes.bool.isRequired
}

export default TrackList;
