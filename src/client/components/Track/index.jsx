import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import { Draggable } from 'react-beautiful-dnd'

import { trackActions } from 'Client/redux/track'
import { setActions } from 'Client/redux/set'

import styles from './Track.module.scss'

function colorFromValence(valence) {
  return `rgb(${(100 - valence) * 2.55}, ${valence * 2.55}, 0)`
}

class Track extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    removeTrackFromList: PropTypes.func.isRequired,
    addTrackToList: PropTypes.func.isRequired,
    changeTrackTempo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    set: PropTypes.string.isRequired,
    data: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      tempo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      durationMs: PropTypes.number.isRequired,
      valence: PropTypes.number.isRequired,
    }).isRequired,
  }

  handleChange = (e) => {
    const { changeTrackTempo, id } = this.props

    e.preventDefault()
    const {
      target: { value },
    } = e
    const notDigits = /[^0-9]/

    if (value.length > 3) return
    if (notDigits.test(value)) return

    changeTrackTempo(id, value)
  }

  render() {
    const {
      removeTrackFromList,
      index,
      set,
      id,
      data: { artist, tempo, name, durationMs, valence },
    } = this.props

    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <li
            className={styles.root}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.info}>
              <input
                placeholder="tempo"
                className={styles.tempo}
                type="text"
                value={tempo}
                onChange={this.handleChange}
              />
              <span style={{ color: colorFromValence(valence) }}>{valence}</span>
              <span>({Moment.duration(durationMs).format('m:ss')})</span>
            </div>
            <span className={styles.artistTrack}>
              {artist} - {name}
            </span>
            <button
              type="button"
              onClick={() => {
                removeTrackFromList(id, set)
              }}
            >
              x
            </button>
          </li>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: {
      ...state.tracks.tracks[ownProps.id],
    },
  }
}

export default connect(
  mapStateToProps,
  {
    removeTrackFromList: setActions.removeTrackFromList,
    addTrackToList: setActions.addTrackToList,
    changeTrackTempo: trackActions.changeTrackTempo,
  },
)(Track)
