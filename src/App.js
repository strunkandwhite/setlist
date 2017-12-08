import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ImportForm from './ImportForm';
import TrackList from './TrackList';
import './App.css';

const spotify = new SpotifyWebApi();
const accessToken = 'BQDo9yYqGQuSzQIYlEKWnlJZF4U7-R_FUeoJHl9BkXDQgfzOcyOWj2LZb-_7Yvzqu-AfnlRlYhSBmCXDunM';
spotify.setAccessToken(accessToken);

class App extends Component {
	constructor() {
		super();

		this.state = {
			tracks: []
		}

		this.handleImportFormSubmit = this.handleImportFormSubmit.bind(this);
		this.handleChangeTrackBPM = this.handleChangeTrackBPM.bind(this);
		this.handleRemoveTrack = this.handleRemoveTrack.bind(this);

		this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
		this.addTracks = this.addTracks.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.moveTrack = this.moveTrack.bind(this);

		this.storeAndSetTracksState = this.storeAndSetTracksState.bind(this);
		this.parseIDsFromInput = this.parseIDsFromInput.bind(this);

	}

	componentWillMount() {
		const cachedTracks = JSON.parse(localStorage.getItem('tracks'));
		if(cachedTracks.length > 0) {
			this.setState({ tracks: cachedTracks });
		}
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
				}
			})
		)
	}

	handleChangeTrackBPM(index, id, input) {
		const modifiedTracks = update(this.state.tracks, {
			[index]: {
				bpm: {$set: input}
			}
		});

		localStorage.setItem(id, input);

		this.storeAndSetTracksState(modifiedTracks);
	}

	handleRemoveTrack(index) {
		this.removeTrack(index);
	}

	removeTrack(index) {
		const filteredTracks = update(this.state.tracks, {
			$splice: [[index, 1]]
		});

		this.storeAndSetTracksState(filteredTracks);
	}

	getTracksFromSpotify(IDs) {
		spotify.getTracks(IDs, (err, data) => {
			if (err) console.error(err);
			else this.addTracks(data.tracks);
		});
	}

	addTracks(tracks) {
		const diffTracks = tracks.filter(newTrack => this.state.tracks.filter(oldTrack => oldTrack.id === newTrack.id).length === 0);
		const tracksToAdd = diffTracks.map(track => {
			const {
				artists,
				name,
				id,
				duration_ms
			} = track;

			const bpm = localStorage.getItem(id) || '';

			return {
				artist: artists[0].name,
				name: name,
				id: id,
				duration_ms: duration_ms,
				bpm: bpm
			}
		});

		const mergedTracks = update(this.state.tracks, {
			$push: tracksToAdd
		});

		this.storeAndSetTracksState(mergedTracks);
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

	storeAndSetTracksState(tracks) {
		localStorage.setItem('tracks', JSON.stringify(tracks));
		this.setState({ tracks: tracks });
	}

  render() {
    return (
      <div className='App'>
				<ImportForm
					handleImportFormSubmit={this.handleImportFormSubmit}
				/>
				<TrackList
					tracks={this.state.tracks}
					handleChangeTrackBPM={this.handleChangeTrackBPM}
					handleRemoveTrack={this.handleRemoveTrack}
					moveTrack={this.moveTrack}
				/>
      </div>
    );
  }
}

export default _.flow(
	DragDropContext(HTML5Backend)
)(App);
