import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment-duration-format';

import TrackList from '../components/TrackList';

const mapStateToProps = (state, { list, maxDuration }) => {
  const listTracks = state.tracksByList[list].tracks.map(track => state.entities.tracks[track]);
  const totalDuration = listTracks.reduce((acc, track) => acc += track.duration_ms, 0);
  const isTooLong = (totalDuration > maxDuration);
  const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', {trim: false});

  return {
    formattedDuration,
    listTracks,
    isTooLong,
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
