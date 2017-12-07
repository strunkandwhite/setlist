import React, { Component } from 'react';
import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
    return (
			<ul className='TrackList'>
				{this.props.tracks.map((track, i) => {
					return <Track
							key={track.id}
							id={track.id}
							index={i}
							artist={track.artist}
							name={track.name}
							bpm={track.bpm}
							handleTrackBPMChange={this.props.handleTrackBPMChange}
							moveTrack={this.props.moveTrack}
						/>
				})
			}
			</ul>
    );
  }
}

export default TrackList;
