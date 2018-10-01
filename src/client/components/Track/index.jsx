import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'

import { trackActions } from 'Client/redux/track'
import { listActions } from 'Client/redux/list'
import { storeTempoLocally } from 'Client/helpers'

import styles from './Track.module.scss'

class Track extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    removeTrackFromList: PropTypes.func.isRequired,
    addTrackToList: PropTypes.func.isRequired,
    changeTrackTempo: PropTypes.func.isRequired,
    data: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      tempo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      durationMs: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      otherList: props.list === 'set' ? 'reserve' : 'set',
      button: props.list === 'set' ? '>' : '<',
    }
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

  switchTrackList = (e) => {
    const { removeTrackFromList, addTrackToList, list, id } = this.props
    const { otherList } = this.state

    e.preventDefault()
    removeTrackFromList(id, list)
    addTrackToList(id, otherList)
  }

  render() {
    const {
      removeTrackFromList,
      list,
      id,
      data: { artist, tempo, name, durationMs },
    } = this.props
    const { button } = this.state

    return (
      <li className={styles.root}>
        <input placeholder="tempo" className={styles.tempo} type="text" value={tempo} onChange={this.handleChange} />
        <span>
          ({Moment.duration(durationMs).format('m:ss')}) {artist} - {name}
        </span>
        <button type="button" onClick={this.switchTrackList}>
          {button}
        </button>
        <button
          type="button"
          onClick={() => {
            removeTrackFromList(id, list)
          }}
        >
          x
        </button>
      </li>
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
    removeTrackFromList: listActions.removeTrackFromList,
    addTrackToList: listActions.addTrackToList,
    changeTrackTempo: trackActions.changeTrackTempo,
  },
)(Track)
