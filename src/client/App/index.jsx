import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { ImportForm, TrackList } from 'Client/components'

import { exportToText, normalizeLists } from 'Client/helpers'

class App extends React.Component {
  static propTypes = {
    normalizedLists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxDuration: PropTypes.number.isRequired,
        tracks: PropTypes.arrayOf(PropTypes.string.isRequired),
      }),
    ).isRequired,
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
    const { normalizedLists, boundExportToText } = this.props

    return (
      <div className={`App ${showImport ? 'show' : 'hide'}-import-form`}>
        {showImport && <ImportForm />}
        {normalizedLists.map((list) => (
          <TrackList key={list.id} {...list} />
        ))}
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
    normalizedLists: normalizeLists(state.lists.lists),
    boundExportToText,
  }
}

export default connect(mapStateToProps)(App)
