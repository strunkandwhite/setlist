import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import update from 'immutability-helper';
import ImportForm from './ImportForm';
import TrackList from './TrackList';
import './App.css';

const accessToken = 'BQDNKiUmymQ-3AUv48R44l0_zUfW7HYdv5nbPt-DT0UpGcp8jSVjGax3vXQRrdiqDQZjfY_yXaYWcD17a7o';

class App extends Component {
  render() {
    return (
      <div className='App'>
				<ImportForm
					handleImportFormSubmit={this.handleImportFormSubmit}
				/>
				<TrackList
					tracks={this.state.tracks}
					handleTrackBPMChange={this.handleTrackBPMChange}
				/>
      </div>
    );
  }

	constructor() {
		super();

		this.state = {
			tracks: []
		}

		this.handleImportFormSubmit = this.handleImportFormSubmit.bind(this);
		this.handleTrackBPMChange = this.handleTrackBPMChange.bind(this);
		this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
		this.setTracks = this.setTracks.bind(this);
		this.parseIDsFromInput = this.parseIDsFromInput.bind(this);

		this.spotify = new SpotifyWebApi();
		this.spotify.setAccessToken(accessToken);
	}

	handleImportFormSubmit(formInput) {
		const IDs = this.parseIDsFromInput(formInput)
		this.getTracksFromSpotify(IDs);
	}

	handleTrackBPMChange(key, input) {
		this.setState(
			update(this.state, {
				tracks: {
					[key]: {
						bpm: {$set: input}
					}
				}
			})
		);
	}

	getTracksFromSpotify(IDs) {
		this.spotify.getTracks(IDs, (err, data) => {
			if (err) console.error(err);
			else this.setTracks(data.tracks);
		});
	}

	setTracks(tracks) {
		const tracksToSet = {};

		_.each(tracks, track => {
			tracksToSet[track.id] = {
				artist: track.artists[0].name,
				name: track.name,
				id: track.id,
				bpm: ''
			}
		});

		this.setState({ tracks: tracksToSet });
	}

	parseIDsFromInput(formInput) {
		const URIList = formInput.split('\n');

		const filteredURIList = URIList.filter(URI => {
			return URI !== '';
		});

		const IDs = filteredURIList.map(URI => {
			return URI.split(':')[2];
		});

		return IDs;
	}
}

export default App;
