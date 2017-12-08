import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import _ from 'lodash';

import Track from './Track';
import CONSTANTS from './constants';

import './TrackList.css';

class TrackList extends Component {
	static propTypes = {
		list: PropTypes.string.isRequired,
		tracks: PropTypes.array.isRequired,
		handleChangeTrackBPM: PropTypes.func.isRequired,
		handleRemoveTrack: PropTypes.func.isRequired,
		handleRemoveAllTracks: PropTypes.func.isRequired,
		moveTrack: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {
			handleRemoveAllTracks,
			list
		} = this.props;

		handleRemoveAllTracks(list);
	}

  render() {
		const {
			handleChangeTrackBPM,
			handleRemoveTrack,
			handleSwitchTrack,
			moveTrack,
			tracks,
			list
		} = this.props;

		const listItems = tracks.map((track, i) => {
			const {
				id,
				duration_ms,
				artist,
				name,
				bpm
			} = track;

			return <Track
				key={id}
				id={id}
				index={i}
				duration_ms={duration_ms}
				artist={artist}
				name={name}
				bpm={bpm}
				handleChangeTrackBPM={handleChangeTrackBPM}
				handleRemoveTrack={handleRemoveTrack}
				handleSwitchTrack={handleSwitchTrack}
				moveTrack={moveTrack}
				list={list}
			/>
		})

		const listDuration = _.sumBy(this.props.tracks, track => track.duration_ms);
		const formattedListDuration = Moment.duration(listDuration).format('h:mm:ss');
		const overrunDuration = 6600000;

		const selector = `TrackList ${list}`
		const durationSelector = ((listDuration > overrunDuration) && list === CONSTANTS.SET) ? 'duration too-long' : 'duration';

		const button = (listItems.length > 0) ? <button onClick={this.handleClick}>Remove all tracks</button> : null;

    return (
			<section className={selector}>
			<h3>{list}</h3>
				<span className={durationSelector}>{formattedListDuration}</span>
				<ul>
					{listItems}
				</ul>
				{button}
			</section>
    )
	}
}

export default TrackList;
