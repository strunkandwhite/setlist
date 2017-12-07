import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ImportForm from './ImportForm';
import TrackList from './TrackList';
import './App.css';

const accessToken = 'BQB8D45K5YsOeFWE56RnzJLo_Q_r6bhDPJldP9tGFzIIs5PHaCoWYgaxA7WHw3boUmboEy5uinh6_cB3stI';

class App extends Component {
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
		this.moveTrack = this.moveTrack.bind(this);

		this.spotify = new SpotifyWebApi();
		this.spotify.setAccessToken(accessToken);
	}

	handleImportFormSubmit(formInput) {
		const IDs = this.parseIDsFromInput(formInput)
		this.getTracksFromSpotify(IDs);
	}

	moveTrack(dragIndex, hoverIndex) {
		const { tracks } = this.state
		const dragTrack = tracks[dragIndex]

		this.setState(
			update(this.state, {
				tracks: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTrack]],
				},
			})
		)
	}

	handleTrackBPMChange(key, input) {
		const { tracks } = this.state;

		const indexToChange = tracks.findIndex(track => {
			return track.id === key;
		});

		tracks[indexToChange].bpm = input;

		this.setState({ tracks: tracks });

		//TODO: non-mutating state update
		/*
		this.setState(
			update(this.state, {
				tracks: {
					[key]: {
						bpm: {$set: input}
					}
				}
			})
		);
		*/
	}

	getTracksFromSpotify(IDs) {
		this.spotify.getTracks(IDs, (err, data) => {
			if (err) console.error(err);
			else this.setTracks(data.tracks);
		});
	}

	setTracks(tracks) {
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

  render() {
    return (
      <div className='App'>
				<ImportForm
					handleImportFormSubmit={this.handleImportFormSubmit}
				/>
				<TrackList
					tracks={this.state.tracks}
					handleTrackBPMChange={this.handleTrackBPMChange}
					moveTrack={this.moveTrack}
				/>
      </div>
    );
  }
}

export default _.flow(
	DragDropContext(HTML5Backend)
)(App);
