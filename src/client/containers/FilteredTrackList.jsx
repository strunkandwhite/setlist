import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment-duration-format';

import TrackList from '../components/TrackList';

const mapStateToProps = (state, { name }) => {
  const listTracks = state.tracksByList[name].tracks.map(track => state.entities.tracks[track]);
  const totalDuration = listTracks.reduce((acc, track) => acc += track.duration_ms, 0);

  return {
    isTooLong: false,
    formattedDuration: '0:00:00',
    tracks: listTracks,
    name
  }
};

const FilteredTrackList = connect(
  mapStateToProps
)(TrackList);

FilteredTrackList.propTypes = {
  name: PropTypes.string.isRequired
}

export default FilteredTrackList;
