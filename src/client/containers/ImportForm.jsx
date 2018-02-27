import React from 'react';
import { connect } from 'react-redux';
import { importTracks } from '../actions';

export const ImportForm = ({ dispatch }) => {
  let textarea;
  const handleSubmit = e => {
    e.preventDefault();
    const value = textarea.value;
    if(!value.trim()) {
      return;
    }
    dispatch(importTracks(value));
  };

  return (
    <section className='ImportForm'>
      <h3>import</h3>
      <form onSubmit={handleSubmit} >
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

export default connect()(ImportForm);
