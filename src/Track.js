import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import _ from 'lodash';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

import ItemTypes from './ItemTypes'
import CONSTANTS from './constants';

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

		if (dragIndex === hoverIndex) return;

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

		props.moveTrack(dragIndex, hoverIndex, props.list)
		monitor.getItem().index = hoverIndex
	}
}

class Track extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		handleChangeTrackBPM: PropTypes.func.isRequired,
		handleRemoveTrack: PropTypes.func.isRequired,
		handleSwitchTrack: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		index: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		bpm: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		list: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSwitchClick = this.handleSwitchClick.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
	}

	handleChange(e) {
		const input = e.target.value;
		const letters = /[a-zA-Z]/;
		const {
			handleChangeTrackBPM,
			index,
			list,
			id
		} = this.props;

		if(input.length > 3) return;
		if(letters.test(input)) return;

		handleChangeTrackBPM(index, list, id, input);
	}

	handleSwitchClick() {
		const {
			handleSwitchTrack,
			index,
			list
		} = this.props;

		handleSwitchTrack(index, list);
	}

	handleRemoveClick(e) {
		const {
			handleRemoveTrack,
			index,
			list
		} = this.props;

		handleRemoveTrack(index, list);
	}

  render() {
		const {
			connectDragSource,
			connectDropTarget,
			isDragging,
			duration_ms,
			artist,
			name,
			bpm,
			type,
			list
		} = this.props

		const selector = `Track ${type} ${(isDragging ? 'dragging' : '')}`
		const trackLength = Moment(duration_ms).format('m:ss');
		const switchButton = <button onClick={this.handleSwitchClick}>{(list === CONSTANTS.SET) ? '>' : '<'}</button>;
		const displayString = (type === CONSTANTS.SONG) ? `${artist} - ${name}` : CONSTANTS.BREAK;

    return connectDragSource(
			connectDropTarget(
				<li className={selector}>
					<div className='track-info'>
						<input
							type='text'
							className='bpm'
							placeholder='bpm'
							onChange={this.handleChange}
							value={bpm}
							disabled={(type !== CONSTANTS.SONG)}
						/>
						<span>({trackLength}) {displayString}</span>
					</div>
					{switchButton}
					<button onClick={this.handleRemoveClick}>x</button>
				</li>
			)
    );
  }
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
