import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { trackActions } from 'Client/redux/track'
import { parseIds } from 'Client/helpers'

class ImportForm extends React.Component {
  static propTypes = {
    importTracks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.textarea = React.createRef()
  }

  handleSubmit = (e) => {
    const { importTracks } = this.props

    e.preventDefault()
    const joinedIds = parseIds(this.textarea.current.value).join(',')
    if (joinedIds.length > 0) {
      importTracks(joinedIds)
    }
  }

  render() {
    return (
      <section className="ImportForm">
        <h3>import</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea className="uri-list" placeholder="Enter URIs here" ref={this.textarea} />
          <button type="submit">Add to tracks</button>
        </form>
      </section>
    )
  }
}

ImportForm.propTypes = {
  importTracks: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    importTracks: trackActions.importTracks,
  },
)(ImportForm)
