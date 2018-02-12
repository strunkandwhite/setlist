import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';

import Track from './Track';
import CONSTANTS from './constants';

import './TrackList.css';

class TrackList extends Component {
  static propTypes = {
    list: PropTypes.string.isRequired,
    tracks: PropTypes.array.isRequired,
    handleTrackBPMChange: PropTypes.func.isRequired,
    handleRemoveTrackClick: PropTypes.func.isRequired,
    handleRemoveAllTracksClick: PropTypes.func.isRequired,
    handleAddSpacerClick: PropTypes.func.isRequired,
    moveTrack: PropTypes.func.isRequired,
    duration: PropTypes.number.isRequired,
    maxDuration: PropTypes.number.isRequired,
    buttonDir: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.handleRemoveAllTracksClick = this.handleRemoveAllTracksClick.bind(this);
    this.handleAddSpacerClick = this.handleAddSpacerClick.bind(this);
    this.outputRemoveButton = this.outputRemoveButton.bind(this);
    this.outputAddSpacerButton = this.outputAddSpacerButton.bind(this);
  }

  handleRemoveAllTracksClick() {
    const {
      handleRemoveAllTracksClick,
      list
    } = this.props;

    handleRemoveAllTracksClick(list);
  }

  handleAddSpacerClick() {
    const {
      handleAddSpacerClick,
      list
    } = this.props;

    handleAddSpacerClick(list);
  }

  outputRemoveButton() {
    return (this.props.tracks.length > 0) ? <button className='remove-all' onClick={this.handleRemoveAllTracksClick}>Remove all tracks</button> : null;
  }

  outputAddSpacerButton() {
    return (this.props.list === CONSTANTS.LISTS.SET) ? <button className='add-spacer' onClick={this.handleAddSpacerClick}>Add spacer</button> : null;
  }

  render() {
    const {
      handleRemoveTrackClick,
      handleSwitchTrackClick,
      handleTrackBPMChange,
      maxDuration,
      buttonDir,
      moveTrack,
      duration,
      tracks,
      list
    } = this.props;

    const durationSelector = (duration > maxDuration) ? 'duration too-long' : 'duration';
    const formattedDuration = Moment.duration(duration).format('h:mm:ss');

    return (
      <section className={`TrackList ${list}`}>
        <h3>{list} <span className={durationSelector}>({formattedDuration})</span></h3>
        <ul>
          {tracks.map(({ id, duration_ms, artist, name, bpm, type }, i) => (
            <Track
              key={id}
              id={id}
              index={i}
              length={Moment(duration_ms).format('m:ss')}
              artist={artist}
              name={name}
              bpm={bpm}
              type={type}
              buttonDir={buttonDir}
              handleTrackBPMChange={handleTrackBPMChange}
              handleRemoveTrackClick={handleRemoveTrackClick}
              handleSwitchTrackClick={handleSwitchTrackClick}
              moveTrack={moveTrack}
              list={list}
            />
        ))}
        </ul>
        <section className='buttons'>
          {this.outputRemoveButton()}
          {this.outputAddSpacerButton()}
        </section>
      </section>
    );
  }
}

export default TrackList;
