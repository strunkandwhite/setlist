import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'

import { trackActions } from 'Client/redux/track'

class Track extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    removeTrackFromList: PropTypes.func.isRequired,
    addTrackToList: PropTypes.func.isRequired,
    changeTrackBpm: PropTypes.func.isRequired,
    data: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      bpm: PropTypes.string.isRequired,
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
    const { changeTrackBpm, id } = this.props

    e.preventDefault()
    const { value } = e
    const letters = /[a-zA-Z]/

    if (value.length > 3) return
    if (letters.test(value)) return

    changeTrackBpm(id, value)
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
      data: { artist, bpm, name, durationMs },
    } = this.props
    const { button } = this.state

    return (
      <li className="Track">
        <input placeholder="bpm" className="bpm" type="text" value={bpm} onChange={this.handleChange} />
        <span>
          ({Moment.duration(durationMs).format('m:ss')}) {artist} - {name}
        </span>
        <button onClick={this.switchTrackList}>{button}</button>
        <button
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
    removeTrackFromList: trackActions.removeTrackFromList,
    addTrackToList: trackActions.addTrackToList,
    changeTrackBpm: trackActions.changeTrackBpm,
  },
)(Track)
