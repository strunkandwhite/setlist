import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  render() {
    return (
			<li className='Track'>
				<div className='artist'>{this.props.artist}</div>
				<div className='name'>{this.props.name}</div>
				<input type='text' className='bpm'></input>
			</li>
    );
  }
}

export default Track;
