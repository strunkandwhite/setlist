import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import cn from 'classnames'
import { connect } from 'react-redux'

import { setActions } from 'Client/redux/set'

import styles from './SetInfo.module.scss'

class SetInfo extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    maxDuration: PropTypes.string.isRequired,
    totalDuration: PropTypes.number.isRequired,
    changeSetName: PropTypes.func.isRequired,
    changeSetMaxDuration: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  handleMaxDurationChange = (e) => {
    e.preventDefault()
    const { changeSetMaxDuration, id } = this.props
    changeSetMaxDuration(id, e.target.value)
  }

  handleNameChange = (e) => {
    e.preventDefault()
    const { changeSetName, id } = this.props
    changeSetName(id, e.target.value)
  }

  toggleEditing = (e) => {
    e.preventDefault()
    this.setState((state) => ({
      isEditing: !state.isEditing,
    }))
  }

  render() {
    const { isEditing } = this.state
    const { name, maxDuration, totalDuration } = this.props

    const maxDurationInSeconds = Moment.duration(maxDuration).asMilliseconds()
    const formattedDuration = Moment.duration(totalDuration).format('h:mm:ss', { trim: false })

    return (
      <header className={styles.root}>
        <h3>
          {isEditing ? <input type="text" value={name} onChange={this.handleNameChange} /> : <span>{name}</span>}
          <span className={cn({ [styles.tooLong]: totalDuration > maxDurationInSeconds })}>({formattedDuration})</span>
        </h3>
        <h4>
          max:{' '}
          {isEditing ? (
            <input type="text" value={maxDuration} onChange={this.handleMaxDurationChange} />
          ) : (
            <span>{maxDuration}</span>
          )}
        </h4>
        <button type="button" onClick={this.toggleEditing}>
          e
        </button>
      </header>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps
  return {
    name: state.sets.sets[id].name,
    maxDuration: state.sets.sets[id].maxDuration,
  }
}

export default connect(
  mapStateToProps,
  {
    ...setActions,
  },
)(SetInfo)
