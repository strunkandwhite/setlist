import React, { Component } from 'react';
import ImportForm from './ImportForm'

class App extends Component {
  render() {
    return (
      <div className='App'>
				<ImportForm handleImportFormSubmit={this.handleImportFormSubmit}/>
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
		const URIs = splitTracks.map(item => {
			return item.split(':')[2];
		});

		this.setState({ URIs: URIs });
	}
}

export default App;
