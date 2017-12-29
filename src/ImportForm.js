import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CONSTANTS from './constants';

import './ImportForm.css'

class ImportForm extends Component {
  static propTypes = {
    handleSubmitImportForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: CONSTANTS.SETLIST
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSetClick = this.handleSetClick.bind(this);
    this.handleReserveClick = this.handleReserveClick.bind(this);
  }

  handleSetClick(e) {
    e.preventDefault();
    this.props.handleSubmitImportForm(this.state.value, CONSTANTS.SET);
  }

  handleReserveClick(e) {
    e.preventDefault();
    this.props.handleSubmitImportForm(this.state.value, CONSTANTS.RESERVE);
  }

  handleChange(e) {
    this.setState({value: e.target.value });
  }

  render() {
    return (
      <section className='ImportForm'>
        <h3>import</h3>
        <form className='ImportForm'>
          <textarea
            className='uri-list'
            onChange={this.handleChange}
            value={this.state.value}
            placeholder='Enter URIs here'
          />
          <button onClick={this.handleSetClick}>Add to set</button>
          <button onClick={this.handleReserveClick}>Add to reserve</button>
        </form>
      </section>
    );
  }
}

export default ImportForm;
