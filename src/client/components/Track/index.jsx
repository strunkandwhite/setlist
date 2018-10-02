import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import { Draggable } from 'react-beautiful-dnd'

import { trackActions } from 'Client/redux/track'
import { setActions } from 'Client/redux/set'
import { storeTempoLocally } from 'Client/helpers'

import styles from './Track.module.scss'

class Track extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    removeTrackFromList: PropTypes.func.isRequired,
    addTrackToList: PropTypes.func.isRequired,
    changeTrackTempo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      tempo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      durationMs: PropTypes.number.isRequired,
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
    storeTempoLocally(id, value)
  }

  render() {
    const {
      removeTrackFromList,
      index,
      set,
      id,
      data: { artist, tempo, name, durationMs },
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
            <input
              placeholder="tempo"
              className={styles.tempo}
              type="text"
              value={tempo}
              onChange={this.handleChange}
            />
            <span>
              ({Moment.duration(durationMs).format('m:ss')}) {artist} - {name}
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
