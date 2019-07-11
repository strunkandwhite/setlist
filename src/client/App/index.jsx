import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import { DragDropContext } from 'react-beautiful-dnd'
import { isEqual } from 'lodash-es'

import Set from 'Client/components/Set'
import { ImportForm } from 'Client/components'
import { exportToText, normalizeLists } from 'Client/helpers'

import { setActions } from 'Client/redux/set'

import styles from './App.module.scss'

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
    insertTrackToList: PropTypes.func.isRequired,
    removeTrackFromList: PropTypes.func.isRequired,
    addSet: PropTypes.func.isRequired,
  }

  state = {
    showImport: true,
  }

  toggleImportForm = () => {
    this.setState((state) => ({
      showImport: !state.showImport,
    }))
  }

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    const { insertTrackToList, removeTrackFromList } = this.props
    if (!destination || !source || isEqual(destination, source)) return
    removeTrackFromList(draggableId, source.droppableId)
    insertTrackToList(draggableId, destination.droppableId, destination.index)
  }

  render() {
    const { showImport } = this.state
    const { normalizedLists, boundExportToText, addSet } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={styles.root}>
          {showImport && <ImportForm />}
          <div className={cn(styles.setContainer, { [styles.importFormHidden]: !showImport })}>
            {normalizedLists.map((set) => (
              <Set key={set.id} {...set} />
            ))}
          </div>
          <button type="button" onClick={boundExportToText} className={cn(styles.button, styles.exportButton)}>
            Export
          </button>
          <button
            type="button"
            onClick={this.toggleImportForm}
            className={cn(styles.button, styles.toggleImportFormButton)}
          >
            Toggle Import Form
          </button>
          <button type="button" onClick={addSet} className={cn(styles.button, styles.addSetButton)}>
            Add Set
          </button>
        </div>
      </DragDropContext>
    )
  }
}

const mapStateToProps = (state) => {
  const boundExportToText = exportToText(state)

  return {
    normalizedLists: normalizeLists(state.sets.sets),
    boundExportToText,
  }
}

export default connect(
  mapStateToProps,
  {
    ...setActions,
  },
)(App)
