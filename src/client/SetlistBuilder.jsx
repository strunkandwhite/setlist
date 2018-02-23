import React from 'react';

import ImportForm from './ImportForm';

import './App.css';

const SetlistBuilder = ({ showImport, toggleImportForm }) => (
  <div className={`App ${showImport ? 'show' : 'hide'}-import-form`}>
    {
      showImport
      ? <ImportForm handleImportFormSubmit={() => {}} />
      : null
    }
    <button onClick={() => {}} className='export'>Export</button>
    <button onClick={toggleImportForm} className='toggle-import-form'>Toggle Import Form</button>
  </div>
);

export default SetlistBuilder;
