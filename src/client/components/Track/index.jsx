import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import 'moment-duration-format'

import { trackActions } from 'Client/redux/track'

const Track = ({
  id,
  artist,
  name,
  durationMs,
  bpm,
  list,
  otherList,
  button,
  changeTrackBpm,
  removeTrackFromList,
  addTrackToList,
}) => {
  let input
  const handleChange = (e) => {
    e.preventDefault()
    const { value } = input
    const letters = /[a-zA-Z]/

    if (value.length > 3) return
    if (letters.test(value)) return

    changeTrackBpm(id, value)
  }

  const switchTrackList = (e) => {
    e.preventDefault()
    removeTrackFromList(id, list)
    addTrackToList(id, otherList)
  }

  return (
    <li className="Track">
      <input
        placeholder="bpm"
        className="bpm"
        type="text"
        value={bpm}
        ref={(node) => {
          input = node
        }}
        onChange={handleChange}
      />
      <span>
        ({Moment.duration(durationMs).format('m:ss')}) {artist} - {name}
      </span>
      <button onClick={switchTrackList}>{button}</button>
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

Track.propTypes = {
  id: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  bpm: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  otherList: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  durationMs: PropTypes.number.isRequired,
  removeTrackFromList: PropTypes.func.isRequired,
  addTrackToList: PropTypes.func.isRequired,
  changeTrackBpm: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    removeTrackFromList: trackActions.removeTrackFromList,
    addTrackToList: trackActions.addTrackToList,
    changeTrackBpm: trackActions.changeTrackBpm,
  },
)(Track)
