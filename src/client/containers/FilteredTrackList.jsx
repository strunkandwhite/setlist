import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment-duration-format';

import TrackList from '../components/TrackList';

const mapStateToProps = (state, { list, maxDuration }) => {
  const listTracks = state.tracksByList[list].tracks.map(track => state.entities.tracks[track]);
  const totalDuration = listTracks.reduce((acc, track) => acc += track.duration_ms, 0);
  const durationClassName = (totalDuration <= maxDuration) ? 'duration' : 'duration too-long';
  const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', {trim: false});
  const otherList = (list === 'set') ? 'reserve' : 'set';
  const button = (list === 'set') ? '>' : '<';

  return {
    formattedDuration,
    durationClassName,
    listTracks,
    otherList,
    button,
    list
  }
};

const FilteredTrackList = connect(
  mapStateToProps
)(TrackList);

FilteredTrackList.propTypes = {
  maxDuration: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired
}

export default FilteredTrackList;
