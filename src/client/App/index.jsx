import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import { DragDropContext } from 'react-beautiful-dnd'
import { isEqual } from 'lodash-es'

import { ImportForm, Set } from 'Client/components'
import { exportToText, normalizeLists } from 'Client/helpers'

import { listActions } from 'Client/redux/list'

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

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    const { insertTrackToList, removeTrackFromList } = this.props
    if (!destination || !source || isEqual(destination, source)) return
    removeTrackFromList(draggableId, source.droppableId)
    insertTrackToList(draggableId, destination.droppableId, destination.index)
  }

  render() {
    const { showImport } = this.state
    const { normalizedLists, boundExportToText } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={styles.root}>
          {showImport && <ImportForm />}
          <div className={cn(styles.setContainer, { [styles.importFormHidden]: !showImport })}>
            {normalizedLists.map((list) => (
              <Set key={list.id} {...list} />
            ))}
          </div>
          <button type="button" onClick={boundExportToText} className={styles.exportButton}>
            Export
          </button>
          <button type="button" onClick={this.toggleImportForm} className={styles.toggleImportFormButton}>
            Toggle Import Form
          </button>
        </div>
      </DragDropContext>
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

export default connect(
  mapStateToProps,
  {
    ...listActions,
  },
)(App)
