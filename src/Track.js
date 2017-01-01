import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import 'moment-duration-format';
import { flow } from 'lodash';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

import CONSTANTS from './constants';

import './Track.css';

const trackSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  }
}

const trackTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) return;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

    props.moveTrack(props.list, dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

class Track extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    handleTrackBPMChange: PropTypes.func.isRequired,
    handleRemoveTrackClick: PropTypes.func.isRequired,
    handleSwitchTrackClick: PropTypes.func.isRequired,
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
    const {
      handleTrackBPMChange,
      index,
      list,
      id
    } = this.props;
    const input = e.target.value;
    const letters = /[a-zA-Z]/;

    if(input.length > 3) return;
    if(letters.test(input)) return;

    handleTrackBPMChange(list, index, id, input);
  }

  handleSwitchClick() {
    const {
      handleSwitchTrackClick,
      index,
      list
    } = this.props;

    handleSwitchTrackClick(list, index);
  }

  handleRemoveClick(e) {
    const {
      handleRemoveTrackClick,
      index,
      list
    } = this.props;

    handleRemoveTrackClick(list, index);
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
    const switchButton = <button onClick={this.handleSwitchClick}>{(list === CONSTANTS.LISTS.SET) ? '>' : '<'}</button>;
    const displayString = `${artist} - ${name}`;

    return connectDragSource(
      connectDropTarget(
        <li className={selector}>
          <input
            type='text'
            className='bpm'
            placeholder='bpm'
            onChange={this.handleChange}
            value={bpm}
            disabled={(type !== CONSTANTS.TYPES.SONG)}
          />
          <span>({trackLength}) {displayString}</span>
          {switchButton}
          <button onClick={this.handleRemoveClick}>x</button>
        </li>
      )
    );
  }
}

export default flow(
  DropTarget(CONSTANTS.TYPES.SONG, trackTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(CONSTANTS.TYPES.SONG, trackSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(Track);
