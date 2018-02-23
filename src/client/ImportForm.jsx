import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { importTracks } from './actions';

import CONSTANTS from './constants';

import './ImportForm.css'

let ImportForm = ({ dispatch }) => {
  let textarea;

  return (
    <section className='ImportForm'>
      <h3>import</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          if(!textarea.value.trim()) {
            return;
          }
          dispatch(importTracks('foo'));
        }}
      >
        <textarea
          className='uri-list'
          placeholder='Enter URIs here'
          ref={node => {textarea = node}}
        />
        <button type='submit'>Add to tracks</button>
      </form>
    </section>
  )
}

ImportForm.propTypes = {
  handleImportFormSubmit: PropTypes.func.isRequired,
}

ImportForm = connect()(ImportForm);

export default ImportForm;
