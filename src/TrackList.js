import React, { Component } from 'react';
import Track from './Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
		const listItems = this.props.tracks.map(track => {
			return <Track key={track.id} artist={track.artists[0].name} name={track.name}/>
		})

    return (
			<ul className='TrackList'>
				{listItems}
			</ul>
    );
  }
}

export default TrackList;
