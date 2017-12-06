import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  render() {
    return (
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

export default Track;
