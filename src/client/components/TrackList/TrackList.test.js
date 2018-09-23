import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import TrackList from './TrackList'
import Track from '../containers/Track'

describe('TrackList', () => {
  let props
  let wrapper

  const trackList = () => {
    if (!wrapper) {
      wrapper = shallow(<TrackList {...props} />)
    }
    return wrapper
  }

  beforeEach(() => {
    props = {
      formattedDuration: 'foo',
      durationClassName: 'qunx',
      listTracks: [],
      otherList: 'baz',
      button: '>',
      list: 'bar',
    }

    wrapper = undefined
  })

  describe('render', () => {
    it('renders without crashing', () => {
      trackList()
    })

    it('renders correctly', () => {
      const tree = renderer.create(<TrackList {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders one Track for each listTrack', () => {
      props.listTracks = [{ id: 1 }, { id: 2 }]
      expect(trackList().find(Track).length).toBe(2)
    })
  })
})
