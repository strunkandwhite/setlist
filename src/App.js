import React, { Component } from 'react';
import * as SpotifyWebApi from 'spotify-web-api-js';
import ImportForm from './ImportForm'
import SongList from './SongList'

const spotifyCreds = {
	clientId: 'a453ca8acfe947bebf7bd1673e3e5f53',
	clientSecret: '454167352426490584785aec8b9dce81'
}

let spotify = new SpotifyWebApi(spotifyCreds);

spotify.setAccessToken('BQDDrHtDAOU9S_TfavtFxj0YeElOndaujsFYQsy3jHmMfXWRpeisWN_VWfiLg_F7HH1_0N53vGmZYbWAfFU');

spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
});

class App extends Component {
  render() {
    return (
      <div className='App'>
				<ImportForm handleImportFormSubmit={this.handleImportFormSubmit}/>
				<SongList songs={this.state.URIs} />
      </div>
    );
  }

	constructor() {
		super();
		this.state = {
			URIs: []
		}

		this.handleImportFormSubmit = this.handleImportFormSubmit.bind(this);
		this.splitTracks = this.splitTracks.bind(this);
	}

	handleImportFormSubmit(value) {
		this.splitTracks(value)

		spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
			if (err) console.error(err);
			else console.log('Artist albums', data);
		});
	}

	splitTracks(tracks) {
		const splitTracks = tracks.split('\n');

		const filteredTracks = splitTracks.filter(track => {
			return track !== '';
		});

		const URIs = filteredTracks.map(item => {
			return {
				URI: item.split(':')[2]
			}
		});

		this.setState({ URIs: URIs });
	}
}

export default App;
