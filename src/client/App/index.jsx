import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ImportForm, TrackList } from 'Client/components'
import { exportToText, normalizeLists } from 'Client/helpers'

import styles from './App.module.scss'

class App extends React.Component {
  static propTypes = {
    normalizedLists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxDuration: PropTypes.string,
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
      <div className={styles.root}>
        {showImport && <ImportForm />}
        {normalizedLists.map((list) => (
          <TrackList importFormHidden={!showImport} key={list.id} {...list} />
        ))}
        <button onClick={boundExportToText} className={styles.exportButton}>
          Export
        </button>
        <button onClick={this.toggleImportForm} className={styles.toggleImportFormButton}>
          Toggle Import Form
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const boundExportToText = exportToText(state)

  return {
    normalizedLists: normalizeLists(state.lists.lists),
    boundExportToText,
  }
}

export default connect(mapStateToProps)(App)
