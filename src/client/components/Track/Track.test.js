import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import Track from './Track'

describe('Track', () => {
  let props
  let wrapper
  let store

  const track = () => {
    if (!wrapper) {
      wrapper = shallow(<Track {...props} store={store} />)
    }
    return wrapper
  }

  const mockStore = configureStore()

  beforeEach(() => {
    props = {
      id: '123abc',
      artist: 'Iron Maiden',
      bpm: '666',
      name: 'Number of the Beast',
      list: 'foo',
      otherList: 'bar',
      button: '>',
      duration_ms: 1000,
    }

    store = mockStore({})

    wrapper = undefined
  })

  describe('render', () => {
    it('renders without crashing', () => {
      track()
    })
  })
})
