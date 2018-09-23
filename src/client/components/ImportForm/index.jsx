import React from 'react'
import { connect } from 'react-redux'
import { importTracks } from 'Client/redux/actions'
import { parseIds } from 'Client/helpers'

const ImportForm = () => {
  let textarea // TODO: better ref
  const handleSubmit = (e) => {
    e.preventDefault()
    const joinedIds = parseIds(textarea.value).join(',')
    if (joinedIds.length > 0) {
      importTracks(joinedIds)
    }
  }

  return (
    <section className="ImportForm">
      <h3>import</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="uri-list"
          placeholder="Enter URIs here"
          ref={(node) => {
            textarea = node
          }}
        />
        <button type="submit">Add to tracks</button>
      </form>
    </section>
  )
}

export default connect(
  null,
  {
    importTracks,
  },
)(ImportForm)
