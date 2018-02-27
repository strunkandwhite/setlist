import React from 'react';
import { shallow } from 'enzyme';
import { Track } from './Track';

describe('Track', () => {
  let props;
  let wrapper;

  const track = () => {
    if(!wrapper) {
      wrapper = shallow(
        <Track {...props} />
      );
    }
    return wrapper;
  }

  beforeEach(() => {
    props = {
      id: '123abc',
      artist: 'Iron Maiden',
      bpm: '666',
      name: 'Number of the Beast',
      list: 'foo',
      otherList: 'bar',
      button: '>',
      duration_ms: 1000
    };

    wrapper = undefined;
  });

  describe('render', () => {
    it('renders without crashing', () => {
      track();
    });
  });
});
