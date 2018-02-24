import React from 'react';
import PropTypes from 'prop-types';

import ImportForm from '../containers/ImportForm';
import FilteredTrackList from '../containers/FilteredTrackList';

import '../styles/App.css';

const SetlistBuilder = ({ showImport, toggleImportForm }) => (
  <div className={`App ${showImport ? 'show' : 'hide'}-import-form`}>
    {
      showImport
      ? <ImportForm/>
      : null
    }
    <FilteredTrackList list='set' />
    <button onClick={() => {}} className='export'>Export</button>
    <button onClick={toggleImportForm} className='toggle-import-form'>Toggle Import Form</button>
  </div>
);

SetlistBuilder.propTypes = {
  showImport: PropTypes.bool.isRequired,
  toggleImportForm: PropTypes.func.isRequired
}

export default SetlistBuilder;
