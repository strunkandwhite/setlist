import React, { Component } from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
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
  render() {
		const { connectDragSource, connectDropTarget } = this.props
    return connectDragSource(
			connectDropTarget(
				<li className='Track'>
					<div className='artist'>{this.props.artist}</div>
					<div className='name'>{this.props.name}</div>
					<input
						type='text'
						className='bpm'
						placeholder='bpm'
						onChange={this.handleChange}
						value={this.props.bpm}
					/>
				</li>
			)
    );
  }

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const input = e.target.value;
		const letters = /[a-zA-Z]/;

		if(!letters.test(input)) {
			this.props.handleTrackBPMChange(this.props.id, input);
		}
	}
}

export default _.flow(
	DropTarget('track', trackTarget, connect => ({
		connectDropTarget: connect.dropTarget(),
	})),
	DragSource('track', trackSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}))
)(Track);
