import React, { Component } from 'react';
import ImportForm from './ImportForm'
import SongList from './SongList'

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
