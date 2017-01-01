import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import { sumBy } from 'lodash';

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
    moveTrack: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleRemoveAllTracksClick = this.handleRemoveAllTracksClick.bind(this);
    this.handleAddSpacerClick = this.handleAddSpacerClick.bind(this);
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

  render() {
    const {
      handleTrackBPMChange,
      handleRemoveTrackClick,
      handleSwitchTrackClick,
      moveTrack,
      tracks,
      list
    } = this.props;

    const listItems = tracks.map(({ id, duration_ms, artist, name, bpm, type }, i) => (
      <Track
        key={id}
        id={id}
        index={i}
        duration_ms={duration_ms}
        artist={artist}
        name={name}
        bpm={bpm}
        type={type}
        handleTrackBPMChange={handleTrackBPMChange}
        handleRemoveTrackClick={handleRemoveTrackClick}
        handleSwitchTrackClick={handleSwitchTrackClick}
        moveTrack={moveTrack}
        list={list}
      />
    ));

    const listDuration = sumBy(this.props.tracks, track => track.duration_ms);
    const formattedListDuration = Moment.duration(listDuration).format('h:mm:ss');
    const overrunDuration = 6900000;

    const durationSelector = ((listDuration > overrunDuration) && list === CONSTANTS.LISTS.SET) ? 'duration too-long' : 'duration';

    const removeButton = (listItems.length > 0) ? <button onClick={this.handleRemoveAllClick}>Remove all tracks</button> : null;
    const addSpacerButton = (list === CONSTANTS.LISTS.SET) ? <button onClick={this.handleAddSpacerClick}>Add spacer</button> : null;

    return (
      <section className={`TrackList ${list}`}>
        <h3>{list} <span className={durationSelector}>({formattedListDuration})</span></h3>
        <ul>
          {listItems}
        </ul>
        <section className='buttons'>
          {removeButton}
          {addSpacerButton}
        </section>
      </section>
    )
  }
}

export default TrackList;
