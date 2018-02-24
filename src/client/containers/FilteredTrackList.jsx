import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment-duration-format';

import TrackList from '../components/TrackList';

const mapStateToProps = (state, { list }) => {
  return {
    tracks: state.tracksByList[list].tracks,
    isTooLong: false,
    formattedDuration: '0:00:00',
    list
  }
};

const FilteredTrackList = connect(
  mapStateToProps
)(TrackList);

FilteredTrackList.propTypes = {
  list: PropTypes.string.isRequired
}

export default FilteredTrackList;
