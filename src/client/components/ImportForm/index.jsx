import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { trackActions } from 'Client/redux/track'
import { parseIds } from 'Client/helpers'

import styles from './ImportForm.module.scss'

class ImportForm extends React.Component {
  static propTypes = {
    importTracks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.textarea = React.createRef()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { importTracks } = this.props

    const joinedIds = parseIds(this.textarea.current.value).join(',')
    if (joinedIds.length > 0) {
      importTracks(joinedIds)
    }
  }

  render() {
    return (
      <section className={styles.root}>
        <h3>import</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea placeholder="Enter URIs here" ref={this.textarea} />
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
