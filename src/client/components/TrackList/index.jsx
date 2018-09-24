import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { connect } from 'react-redux'
import cn from 'classnames'

import Track from 'Client/components/Track'

import styles from './TrackList.module.scss'

const TrackList = ({ id, maxDuration, totalDuration, tracks, importFormHidden }) => {
  const maxDurationInSeconds = Moment.duration(maxDuration).asMilliseconds()
  const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', { trim: false })

  return (
    <section className={cn(styles.root, styles[id], { [styles.importFormHidden]: importFormHidden })}>
      <h3>
        {id}{' '}
        <span className={cn({ [styles.tooLong]: totalDuration > maxDurationInSeconds })}>({formattedDuration})</span>
      </h3>
      <ul>
        {tracks.map((track) => (
          <Track key={track} id={track} list={id} />
        ))}
      </ul>
    </section>
  )
}

TrackList.propTypes = {
  id: PropTypes.string.isRequired,
  maxDuration: PropTypes.string.isRequired,
  totalDuration: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  importFormHidden: PropTypes.bool,
}

TrackList.defaultProps = {
  importFormHidden: false,
}

function mapStateToProps(state, ownProps) {
  return {
    totalDuration: ownProps.tracks.reduce((duration, track) => duration + state.tracks.tracks[track].durationMs, 0),
  }
}

export default connect(mapStateToProps)(TrackList)
