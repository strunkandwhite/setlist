import React, { Component } from 'react';
import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
		const listItems = this.props.tracks.map(track => {
			return <Track
					key={track.id}
					id={track.id}
					artist={track.artist}
					name={track.name}
					bpm={track.bpm}
					handleTrackBPMChange={this.props.handleTrackBPMChange}
				/>
		})

    return (
			<ul className='TrackList'>
				{listItems}
			</ul>
    );
  }
}

export default TrackList;
