import React from 'react';
import { connect } from 'react-redux';
import { importTracks } from '../actions';
import { parseIds } from '../helpers'

export const ImportForm = ({ dispatch }) => {
  let textarea;
  const handleSubmit = e => {
    e.preventDefault();
    const joinedIds = parseIds(textarea.value).join(',');
    if(joinedIds.length > 0) {
      dispatch(importTracks(joinedIds));
    }
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
