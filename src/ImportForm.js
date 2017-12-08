import React, { Component } from 'react';
import './ImportForm.css'

class ImportForm extends Component {
  render() {
    return (
      <form className='ImportForm'>
				<textarea
					className='uri-list'
					onChange={this.handleChange}
					value={this.state.value}
					placeholder='Enter URIs here'
				/>
				<button onClick={this.handleClick}>import</button>
      </form>
    );
  }

	constructor(props) {
		super(props);
		this.state = {value: ''}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.handleImportFormSubmit(this.state.value);
	}

	handleChange(e) {
		this.setState({value: e.target.value });
	}
}

export default ImportForm;
