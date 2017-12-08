import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'moment';
import 'moment-duration-format';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import './Track.css';

const trackSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const trackTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveTrack(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

class Track extends Component {
	constructor(props) {
		super(props);

		this.handleBPMChange = this.handleBPMChange.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleBPMChange(e) {
		const input = e.target.value;
		const letters = /[a-zA-Z]/;

		if(!letters.test(input)) {
			this.props.handleChangeTrackBPM(this.props.index, this.props.id, input);
		}
	}

	handleButtonClick(e) {
		this.props.handleRemoveTrack(this.props.index);
	}

  render() {
		const {
			connectDragSource,
			connectDropTarget,
			isDragging,
			duration_ms,
			artist,
			name,
			bpm
		} = this.props

		const selector = 'Track' + (isDragging ? ' dragging' : '');
		const trackLength = Moment(duration_ms).format('m:ss');

    return connectDragSource(
			connectDropTarget(
				<li className={selector}>
					<div className='track-info'>
						<input
							type='text'
							className='bpm'
							placeholder='bpm'
							onChange={this.handleBPMChange}
							value={bpm}
						/>
						<span>({trackLength}) {artist} - {name}</span>
					</div>
					<button onClick={this.handleButtonClick}>x</button>
				</li>
			)
    );
  }
}

Track.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	handleChangeTrackBPM: PropTypes.func.isRequired,
	handleRemoveTrack: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	artist: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	bpm: PropTypes.string.isRequired,
}

export default _.flow(
	DropTarget(ItemTypes.TRACK, trackTarget, connect => ({
		connectDropTarget: connect.dropTarget(),
	})),
	DragSource(ItemTypes.TRACK, trackSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}))
)(Track);
