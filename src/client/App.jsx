import { connect } from 'react-redux';
import { TOGGLE_IMPORT_FORM } from './actions'
import SetlistBuilder from './SetlistBuilder';

const mapStateToProps = state => {
  return {
    showImport: state.showImport
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
