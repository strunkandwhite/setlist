import React, { Component } from 'react';

class TrackList extends Component {
  render() {
		const listItems = this.props.tracks.map(track => {
			console.log(track);
			return <li key={track.id}>{track.artists[0].name} - {track.name}</li>;
		})

    return (
			<ul>
				{listItems}
			</ul>
    );
  }
}

export default TrackList;
