import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flow } from 'lodash';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import Moment from 'moment';
import 'moment-duration-format';

import CONSTANTS from './constants';

import './Track.css';

class Track extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    handleTrackBPMChange: PropTypes.func.isRequired,
    handleRemoveTrackClick: PropTypes.func.isRequired,
    handleSwitchTrackClick: PropTypes.func.isRequired,
    moveTrack: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    duration_ms: PropTypes.number.isRequired,
    buttonDir: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bpm: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      handleTrackBPMChange,
      handleRemoveTrackClick,
      handleSwitchTrackClick,
      isDragging,
      index,
      duration_ms,
      buttonDir,
      artist,
      name,
      bpm,
      type,
      list,
      id
    } = this.props;

    return connectDragSource(
      connectDropTarget(
        <li className={`Track ${type} ${(isDragging ? 'dragging' : '')}`}>
          <input
            onChange={(e) => handleTrackBPMChange(list, index, id, e)}
            disabled={(type !== CONSTANTS.TYPES.SONG)}
            placeholder='bpm'
            className='bpm'
            value={bpm}
            type='text'
          />
          <span>({Moment(duration_ms).format('m:ss')}) {artist} - {name}</span>
          <button onClick={() => handleSwitchTrackClick(list, index)}>{buttonDir}</button>
          <button onClick={() => handleRemoveTrackClick(list, index)}>x</button>
        </li>
      )
    )
  }
};


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

export default flow(
  DropTarget(CONSTANTS.TYPES.SONG, trackTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(CONSTANTS.TYPES.SONG, trackSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(Track);
