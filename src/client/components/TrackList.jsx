import React from 'react';
import PropTypes from 'prop-types';

import Track from '../containers/Track';

const TrackList = ({
  formattedDuration,
  listTracks,
  isTooLong,
  list,
}) => {
  const className = (isTooLong) ? 'duration too-long' : 'duration';
  const otherList = (list === 'set') ? 'reserve' : 'set';
  const button = (list === 'set') ? '>' : '<';

  return (
    <section className={`TrackList ${list}`}>
      <h3>
        {list}&nbsp;
        <span className={className}>
          ({formattedDuration})
        </span>
      </h3>
      <ul>
        {listTracks.map(track => <Track key={track.id} button={button} list={list} otherList={otherList} {...track} />)}
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
