import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import ImportForm from 'Client/components/ImportForm'
// import FilteredTrackList from 'Client/components/FilteredTrackList'

import { exportToText, normalizeLists } from 'Client/helpers'

class App extends React.Component {
  static propTypes = {
    // lists: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     id: PropTypes.string.isRequired,
    //     maxDuration: PropTypes.number.isRequired,
    //   }),
    // ).isRequired,
    boundExportToText: PropTypes.func.isRequired,
  }

  state = {
    showImport: true,
  }

  toggleImportForm = () => {
    this.setState((state) => ({
      showImport: !state.showImport,
    }))
  }

  render() {
    const { showImport } = this.state
    const { boundExportToText } = this.props

    return (
      // TODO: CLASSNAME USED?
      <div className={`App ${showImport ? 'show' : 'hide'}-import-form`}>
        {showImport && <ImportForm />}
        {/* {Object.entries(lists).map(([id, list]) => (
          <FilteredTrackList key={id} {...list} />
        ))} */}
        <button onClick={boundExportToText} className="export">
          Export
        </button>
        <button onClick={this.toggleImportForm} className="toggle-import-form">
          Toggle Import Form
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const boundExportToText = exportToText(state) // TODO: Huh???

  return {
    lists: normalizeLists(state.lists.lists),
    boundExportToText,
  }
}

export default connect(mapStateToProps)(App)
