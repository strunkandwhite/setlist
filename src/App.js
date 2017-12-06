import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import ImportForm from './ImportForm';
import TrackList from './TrackList';
import './App.css';

const accessToken = 'BQAYJ3mWrdO6V6wvAVFkkBkRPbKtWpcFBEZOEpbMYPndWBsa1M67C8HmQSJxEu8HCa8Ad1jCtGTLVvS3k4I';

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
		this.parseIDsFromInput = this.parseIDsFromInput.bind(this);
		this.parseIDFromURI = this.parseIDFromURI.bind(this);
		this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
		this.setTracks = this.setTracks.bind(this);

		this.spotify = new SpotifyWebApi();
		this.spotify.setAccessToken(accessToken);
	}

	handleImportFormSubmit(formInput) {
		const IDs = this.parseIDsFromInput(formInput)
		this.getTracksFromSpotify(IDs);
	}

	getTracksFromSpotify(IDs) {
		this.spotify.getTracks(IDs, (err, data) => {
			if (err) console.error(err);
			else this.setTracks(data.tracks);
		});
	}

	setTracks(tracks) {
		//TODO: should these not be keyed? why not?
		const tracksToSet = tracks.map(track => {
			return {
				artist: track.artists[0].name,
				name: track.name,
				id: track.id,
				bpm: ''
			}
		});

		this.setState({ tracks: tracksToSet });
	}

	handleTrackBPMChange(key, input) {
		//TODO: better, non-mutating way to pick out and modify the right track?
		let tracks = this.state.tracks;
		const indexOfTrackToChange = tracks.findIndex(track => {
			return track.id === key;
		});

		tracks[indexOfTrackToChange].bpm = input;

		this.setState({ tracks: tracks });
	}

	parseIDFromURI(URI) {
		return URI.split(':')[2];
	}

	parseIDsFromInput(formInput) {
		const URIList = formInput.split('\n');

		const filteredURIList = URIList.filter(URI => {
			return URI !== '';
		});

		const IDs = filteredURIList.map(URI => {
			return this.parseIDFromURI(URI);
		});

		return IDs;
	}
}

export default App;
