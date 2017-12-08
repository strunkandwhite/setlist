import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import _ from 'lodash';

import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
		const {
			handleTrackBPMChange,
			handleTrackRemove,
			moveTrack,
			tracks
		} = this.props;

		const listLength = _.sumBy(tracks, track => { return track.duration_ms });
		const formattedListLength = Moment.duration(listLength).format('h:mm:ss');

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
				handleTrackBPMChange={handleTrackBPMChange}
				handleTrackRemove={handleTrackRemove}
				moveTrack={moveTrack}
			/>
		})

    return (
			<section className='TrackList'>
				{formattedListLength}
				<ul>
					{listItems}
				</ul>
			</section>
    )
	}
}

TrackList.propTypes = {
	tracks: PropTypes.array.isRequired,
	handleTrackBPMChange: PropTypes.func.isRequired,
	moveTrack: PropTypes.func.isRequired
}

export default TrackList;
