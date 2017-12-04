import React, { Component } from 'react';
import URIForm from './URIForm'

class App extends Component {
  render() {
    return (
      <div className='App'>
				<URIForm handleURIFormSubmit={this.handleURIFormSubmit}/>
      </div>
    );
  }

	constructor() {
		super();

		this.handleURIFormSubmit = this.handleURIFormSubmit.bind(this);
	}

	handleURIFormSubmit() {
		console.log("form");
	}
}

export default App;
