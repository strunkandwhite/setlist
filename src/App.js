import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import ImportForm from './ImportForm'
import TrackList from './TrackList'

const spotify = new SpotifyWebApi();
spotify.setAccessToken('BQDDrHtDAOU9S_TfavtFxj0YeElOndaujsFYQsy3jHmMfXWRpeisWN_VWfiLg_F7HH1_0N53vGmZYbWAfFU');

class App extends Component {
  render() {
    return (
      <div className='App'>
				<ImportForm handleImportFormSubmit={this.handleImportFormSubmit}/>
				<TrackList tracks={this.state.tracks} />
      </div>
    );
  }

	constructor() {
		super();
		this.state = {
			IDs: [],
			tracks: []
		}

		this.handleImportFormSubmit = this.handleImportFormSubmit.bind(this);
		this.parseIDs = this.parseIDs.bind(this);
		this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
	}

	handleImportFormSubmit(value) {
		this.parseIDs(value)
	}

	parseIDs(URIs) {
		const splitURIs = URIs.split('\n');

		const filteredURIs = splitURIs.filter(URI => {
			return URI !== '';
		});

		const IDs = filteredURIs.map(URI => {
			return URI.split(':')[2];
		});

		this.setState({ IDs: IDs });
	}

	componentDidUpdate() {
		this.getTracksFromSpotify();
	}

	getTracksFromSpotify() {
		spotify.getTracks(this.state.IDs, (err, data) => {
			if (err) console.error(err);
			else this.setState({ tracks: data.tracks });
		});
	}
}

export default App;
