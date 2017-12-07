import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
		const {
			handleTrackBPMChange,
			moveTrack
		} = this.props;

    return (
			<ul className='TrackList'>
				{this.props.tracks.map((track, i) => {
					const {
						id,
						artist,
						name,
						bpm
					} = track;

					return <Track
						key={id}
						index={i}
						artist={artist}
						name={name}
						bpm={bpm}
						handleTrackBPMChange={handleTrackBPMChange}
						moveTrack={moveTrack}
					/>
				})
			}
			</ul>
    );
  }
}

TrackList.propTypes = {
	tracks: PropTypes.array.isRequired,
	handleTrackBPMChange: PropTypes.func.isRequired,
	moveTrack: PropTypes.func.isRequired
}

export default TrackList;
