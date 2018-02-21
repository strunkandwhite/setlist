import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';

import Track from './Track';
import CONSTANTS from './constants';

import './TrackList.css';

const TrackList = ({
  list,
  tracks,
  handleTrackBPMChange,
  handleRemoveTrackClick,
  handleRemoveAllTracksClick,
  handleAddSpacerClick,
  handleSwitchTrackClick,
  moveTrack,
  duration,
  maxDuration,
  buttonDir
}) => {
  const className = (duration > maxDuration) ? 'duration too-long' : 'duration';
  const formattedDuration = Moment.duration(duration).format('h:mm:ss');
  const removeAllButton = (tracks.length > 0) ?
    <button className='remove-all' onClick={() => handleRemoveAllTracksClick(list)}>Remove all tracks</button> : null;
  const addSpacerButton = (list === CONSTANTS.LISTS.SET) ?
    <button className='add-spacer' onClick={() => handleAddSpacerClick(list)}>Add spacer</button> : null;

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
          <Track
            key={track.id}
            index={index}
            buttonDir={buttonDir}
            handleTrackBPMChange={handleTrackBPMChange}
            handleRemoveTrackClick={handleRemoveTrackClick}
            handleSwitchTrackClick={handleSwitchTrackClick}
            moveTrack={moveTrack}
            list={list}
            {...track}
          />
        ))}
      </ul>
      <section className='buttons'>
        {removeAllButton}
        {addSpacerButton}
      </section>
    </section>
  )
};

TrackList.propTypes = {
  list: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  handleTrackBPMChange: PropTypes.func.isRequired,
  handleRemoveTrackClick: PropTypes.func.isRequired,
  handleRemoveAllTracksClick: PropTypes.func.isRequired,
  handleAddSpacerClick: PropTypes.func.isRequired,
  handleSwitchTrackClick: PropTypes.func.isRequired,
  moveTrack: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  maxDuration: PropTypes.number.isRequired,
  buttonDir: PropTypes.string.isRequired
}

export default TrackList;
