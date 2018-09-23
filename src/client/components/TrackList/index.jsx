import React from 'react'
import PropTypes from 'prop-types'

import Track from 'Client/components/Track'

const TrackList = ({ formattedDuration, durationClassName, listTracks, otherList, button, list }) => (
  <section className={`TrackList ${list}`}>
    <h3>
      {list} <span className={durationClassName}>({formattedDuration})</span>
    </h3>
    <ul>
      {listTracks.map((track) => (
        <Track key={track.id} button={button} list={list} otherList={otherList} {...track} />
      ))}
    </ul>
  </section>
)

TrackList.propTypes = {
  formattedDuration: PropTypes.string.isRequired,
  durationClassName: PropTypes.string.isRequired,
  listTracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired, // TODO: Shape???
  otherList: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
}

export default TrackList
