import React, { Component } from 'react';

class SongList extends Component {
  render() {
		const listItems = this.props.songs.map(song => {
			return <li key={song.URI}>{song.URI}</li>;
		})

    return (
			<ul>
				{listItems}
			</ul>
    );
  }
}

export default SongList;
