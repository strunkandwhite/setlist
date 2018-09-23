import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

import Track from 'Client/components/Track'

const TrackList = ({ id, maxDuration, tracks }) => {
  const totalDuration = tracks.reduce((acc, track) => acc + track.duration_ms, 0)
  const durationClassName = totalDuration <= maxDuration ? 'duration' : 'duration too-long'
  const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', { trim: false })

  return (
    <section className={`TrackList ${id}`}>
      <h3>
        {id} <span className={durationClassName}>({formattedDuration})</span>
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
  maxDuration: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default TrackList
