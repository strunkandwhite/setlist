import React, { Component } from 'react';
import _ from 'lodash';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Track from './Track';
import './TrackList.css';


class TrackList extends Component {
	moveTrack(dragIndex, hoverIndex) {
		const { tracks } = this.props
		const dragTrack = tracks[dragIndex]

		console.log(dragTrack, hoverIndex);

		/*
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
		*/
	}

	constructor() {
		super();

		this.moveTrack = this.moveTrack.bind(this);
	}

  render() {
    return (
			<ul className='TrackList'>
				{_.map(this.props.tracks, track => {
					return <Track
							key={track.id}
							id={track.id}
							artist={track.artist}
							name={track.name}
							bpm={track.bpm}
							handleTrackBPMChange={this.props.handleTrackBPMChange}
							moveTrack={this.moveTrack}
						/>
				})
			}
			</ul>
    );
  }
}

export default _.flow(
	DragDropContext(HTML5Backend)
)(TrackList);
