import React from 'react'
import { shallow } from 'enzyme'
import { ImportForm } from './ImportForm'

it('renders without crashing', () => {
  shallow(<ImportForm />)
})
