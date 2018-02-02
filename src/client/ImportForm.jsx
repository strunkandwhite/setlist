import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CONSTANTS from './constants';

import './ImportForm.css'

class ImportForm extends Component {
  static propTypes = {
    handleImportFormSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: CONSTANTS.SETLIST
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    e.preventDefault();
    const list = e.target.value;

    this.props.handleImportFormSubmit(list, this.state.value);
  }

  handleChange(e) {
    this.setState({value: e.target.value });
  }

  render() {
    return (
      <section className='ImportForm'>
        <h3>import</h3>
        <form>
          <textarea
            className='uri-list'
            onChange={this.handleChange}
            value={this.state.value}
            placeholder='Enter URIs here'
          />
          {[CONSTANTS.LISTS.SET, CONSTANTS.LISTS.RESERVE].map(list => (
            <button key={list} value={list} onClick={this.handleButtonClick}> Add to {list}</button>
          ))}
        </form>
      </section>
    );
  }
}

export default ImportForm;
