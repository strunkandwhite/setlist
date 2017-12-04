import React, { Component } from 'react';

class URIForm extends Component {
  render() {
    return (
      <form className='URIForm'>
				<textarea
					className='uri-list'
					onChange={this.handleChange}
					value={this.state.value}
				/>
				<button onClick={this.handleClick}>click</button>
      </form>
    );
  }

	constructor(props) {
		super(props);
		this.state = {value: 'Enter URIs here'}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.handleURIFormSubmit();
	}

	handleChange(event) {
		this.setState({value: event.target.value });
	}
}

export default URIForm;
