import React from 'react';
import PropTypes from 'prop-types';

import ImportForm from '../containers/ImportForm';
import FilteredTrackList from '../containers/FilteredTrackList';

const SetlistBuilder = ({ lists, showImport, boundExportToText, toggleImportForm }) => (
  <div className={`App ${showImport ? 'show' : 'hide'}-import-form`}>
    {
      showImport
      ? <ImportForm/>
      : null
    }
    {lists.map(list => <FilteredTrackList key={list.id} {...list}/>)}
    <button onClick={boundExportToText} className='export'>Export</button>
    <button onClick={toggleImportForm} className='toggle-import-form'>Toggle Import Form</button>
  </div>
)

SetlistBuilder.propTypes = {
  lists: PropTypes.array.isRequired,
  showImport: PropTypes.bool.isRequired,
  toggleImportForm: PropTypes.func.isRequired,
  boundExportToText: PropTypes.func.isRequired
}

export default SetlistBuilder;
