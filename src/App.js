import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ImportForm from './ImportForm';
import TrackList from './TrackList';
import './App.css';

const accessToken = 'BQDo9yYqGQuSzQIYlEKWnlJZF4U7-R_FUeoJHl9BkXDQgfzOcyOWj2LZb-_7Yvzqu-AfnlRlYhSBmCXDunM';

class App extends Component {
	constructor() {
		super();

		this.state = {
			tracks: []
		}

		this.handleImportFormSubmit = this.handleImportFormSubmit.bind(this);
		this.handleTrackBPMChange = this.handleTrackBPMChange.bind(this);
		this.handleTrackRemove = this.handleTrackRemove.bind(this);
		this.getTracksFromSpotify = this.getTracksFromSpotify.bind(this);
		this.addTracks = this.addTracks.bind(this);
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
				}
			})
		)
	}

	handleTrackBPMChange(index, input) {
		this.setState(
			update(this.state, {
				tracks: {
					[index]: {
						bpm: {$set: input}
					}
				}
			})
		);
	}

	handleTrackRemove(index) {
		this.setState(
			update(this.state, {
				tracks: {
					$splice: [[index, 1]]
				},
			})
		);
	}

	getTracksFromSpotify(IDs) {
		this.spotify.getTracks(IDs, (err, data) => {
			if (err) console.error(err);
			else this.addTracks(data.tracks);
		});
	}

	addTracks(tracks) {
		const tracksToAdd = tracks.map(track => {
			const {
				artists,
				name,
				id,
				duration_ms
			} = track;

			return {
				artist: artists[0].name,
				name: name,
				id: id,
				duration_ms: duration_ms,
				bpm: ''
			}
		});

		this.setState(
			update(this.state, {
				tracks: {
					$push: tracksToAdd
				}
			})
		)
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
					handleTrackRemove={this.handleTrackRemove}
					moveTrack={this.moveTrack}
				/>
      </div>
    );
  }
}

export default _.flow(
	DragDropContext(HTML5Backend)
)(App);
