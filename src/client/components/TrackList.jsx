import React from 'react';
import PropTypes from 'prop-types';

import Track from '../containers/Track';

import '../styles/TrackList.css';

const TrackList = ({
  formattedDuration,
  listTracks,
  isTooLong,
  list,
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
        {listTracks.map(track => <Track key={track.id} list={list} {...track} />)}
      </ul>
    </section>
  )
};

TrackList.propTypes = {
  formattedDuration: PropTypes.string.isRequired,
  listTracks: PropTypes.array.isRequired,
  isTooLong: PropTypes.bool.isRequired,
  list: PropTypes.string.isRequired
}

export default TrackList;
