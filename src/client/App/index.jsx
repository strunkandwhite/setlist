import { connect } from 'react-redux'

import SetlistBuilder from 'Client/components/SetlistBuilder'

import { exportToText } from 'Client/helpers'
import { toggleImportForm } from 'Client/redux/actions'

const mapStateToProps = (state) => {
  const materializedLists = Object.entries(state.entities.lists).map(([id, list]) => ({
    maxDuration: list.maxDuration,
    list: list.list,
    id,
  }))

  const boundExportToText = exportToText(state)
  const className = `App ${state.showImport ? 'show' : 'hide'}-import-form`

  return {
    showImport: state.showImport,
    lists: materializedLists,
    boundExportToText,
    className,
  }
}

const App = connect(
  mapStateToProps,
  {
    toggleImportForm,
  },
)(SetlistBuilder)

export default App
