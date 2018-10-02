import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'

import { Track, SetInfo } from 'Client/components'

import styles from './Set.module.scss'

const Set = ({ id, tracks, totalDuration }) => (
  <section className={styles.root}>
    <SetInfo totalDuration={totalDuration} id={id} />
    <Droppable droppableId={id}>
      {(provided) => (
        <ul ref={provided.innerRef}>
          {tracks.map((track, i) => (
            <Track key={track} id={track} set={id} index={i} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </section>
)

Set.propTypes = {
  id: PropTypes.string.isRequired,
  totalDuration: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    totalDuration: ownProps.tracks.reduce((duration, track) => duration + state.tracks.tracks[track].durationMs, 0),
  }
}

export default connect(mapStateToProps)(Set)
