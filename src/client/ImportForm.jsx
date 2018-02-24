import React from 'react';
import { connect } from 'react-redux';
import { importTracks } from './actions';

import './ImportForm.css'

let ImportForm = ({ dispatch }) => {
  let textarea;

  return (
    <section className='ImportForm'>
      <h3>import</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          const value = textarea.value;
          if(!value.trim()) {
            return;
          }
          dispatch(importTracks(value));
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

ImportForm = connect()(ImportForm);

export default ImportForm;
