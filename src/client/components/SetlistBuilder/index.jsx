import React from 'react'
import PropTypes from 'prop-types'

import ImportForm from 'Client/components/ImportForm'
import FilteredTrackList from 'Client/components/FilteredTrackList'

const SetlistBuilder = ({ lists, className, showImport, boundExportToText, toggleImportForm }) => (
  <div className={className}>
    {showImport ? <ImportForm /> : null}
    {lists.map((list) => (
      <FilteredTrackList key={list.id} {...list} />
    ))}
    <button onClick={boundExportToText} className="export">
      Export
    </button>
    <button onClick={toggleImportForm} className="toggle-import-form">
      Toggle Import Form
    </button>
  </div>
)

SetlistBuilder.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired, // TODO: Shape right?
  showImport: PropTypes.bool.isRequired,
  toggleImportForm: PropTypes.func.isRequired,
  boundExportToText: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default SetlistBuilder
