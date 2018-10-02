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
    <section className={cn(styles.root, styles[id])}>
      <header>
        <h3>
          {id}{' '}
          <span className={cn({ [styles.tooLong]: totalDuration > maxDurationInSeconds })}>({formattedDuration})</span>
        </h3>
        <h4>max: {maxDuration}</h4>
      </header>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul ref={provided.innerRef}>
            {tracks.map((track, i) => (
              <Track key={track} id={track} list={id} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
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
