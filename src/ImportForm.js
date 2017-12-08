import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImportForm.css'

class ImportForm extends Component {
	static propTypes = {
		handleSubmitImportForm: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.handleSubmitImportForm(this.state.value);
	}

	handleChange(e) {
		this.setState({value: e.target.value });
	}

  render() {
    return (
      <form className='ImportForm'>
				<textarea
					className='uri-list'
					onChange={this.handleChange}
					value={this.state.value}
					placeholder='Enter URIs here'
				/>
				<button onClick={this.handleClick}>Add to set</button>
      </form>
    );
  }
}

export default ImportForm;
