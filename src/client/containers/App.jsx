import { connect } from 'react-redux';

import { exportToText } from '../helpers';
import { TOGGLE_IMPORT_FORM } from '../actions';
import SetlistBuilder from '../components/SetlistBuilder';

const mapStateToProps = state => {
  let materializedLists = [];

  for(let list in state.entities.lists) {
    materializedLists.push({
      maxDuration: state.entities.lists[list].maxDuration,
      list: state.entities.lists[list].list,
      id: list
    })
  }

  const boundExportToText = exportToText(state);
  const className = `App ${state.showImport ? 'show' : 'hide'}-import-form`;

  return {
    showImport: state.showImport,
    lists: materializedLists,
    boundExportToText,
    className
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleImportForm: () => {
      dispatch({type: TOGGLE_IMPORT_FORM});
    }
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetlistBuilder);

export default App;
