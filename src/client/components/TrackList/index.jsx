import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { connect } from 'react-redux'
import cn from 'classnames'
import { Droppable } from 'react-beautiful-dnd'

import Track from 'Client/components/Track'

import styles from './TrackList.module.scss'

const TrackList = ({ id, maxDuration, totalDuration, tracks }) => {
  const maxDurationInSeconds = Moment.duration(maxDuration).asMilliseconds()
  const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', { trim: false })

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <section ref={provided.innerRef} className={cn(styles.root, styles[id])}>
          <h3>
            {id}{' '}
            <span className={cn({ [styles.tooLong]: totalDuration > maxDurationInSeconds })}>
              ({formattedDuration})
            </span>
          </h3>
          <ul>
            {tracks.map((track, i) => (
              <Track key={track} id={track} list={id} index={i} />
            ))}
          </ul>
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  )
}

TrackList.propTypes = {
  id: PropTypes.string.isRequired,
  maxDuration: PropTypes.string.isRequired,
  totalDuration: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    totalDuration: ownProps.tracks.reduce((duration, track) => duration + state.tracks.tracks[track].durationMs, 0),
  }
}

export default connect(mapStateToProps)(TrackList)
