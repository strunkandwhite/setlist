import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import _ from 'lodash';

import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
	static propTypes = {
		tracks: PropTypes.array.isRequired,
		handleChangeTrackBPM: PropTypes.func.isRequired,
		handleRemoveTrack: PropTypes.func.isRequired,
		handleRemoveAllTracks: PropTypes.func.isRequired,
		moveTrack: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.getFormattedListLength = this.getFormattedListLength.bind(this);
	}

	handleClick() {
		this.props.handleRemoveAllTracks();
	}

	getFormattedListLength() {
		const listLength = _.sumBy(this.props.tracks, track => track.duration_ms);
		const formattedListLength = Moment.duration(listLength).format('h:mm:ss');

		return formattedListLength;
	}

  render() {
		const {
			handleChangeTrackBPM,
			handleRemoveTrack,
			moveTrack,
			tracks
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
				moveTrack={moveTrack}
			/>
		})

    return (
			<section className='TrackList'>
				{this.getFormattedListLength()}
				<ul>
					{listItems}
				</ul>
				<button onClick={this.handleClick}>Remove all tracks</button>
			</section>
    )
	}
}

export default TrackList;
