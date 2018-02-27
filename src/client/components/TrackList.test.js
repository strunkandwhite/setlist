import React from 'react';
import { shallow } from 'enzyme';
import TrackList from './TrackList';
import Track from '../containers/Track';

describe('TrackList', () => {
  let props;
  let wrapper;

  const trackList = () => {
    if(!wrapper) {
      wrapper = shallow(
        <TrackList {...props} />
      );
    }
    return wrapper;
  }

  beforeEach(() => {
    props = {
      formattedDuration: 'foo',
      listTracks: [],
      isTooLong: false,
      list: 'bar'
    };

    wrapper = undefined;
  });

  describe('render', () => {
    it('renders without crashing', () => {
      trackList();
    });

    it('renders a top-level <section>', () => {
      expect(trackList().is('section')).toBe(true);
    });

    describe('props.duration behavior', () => {
      it('indicates the list duration', () => {
        expect(trackList().find('.duration').text()).toContain(props.formattedDuration);
      });

      describe('when duration is greater than maxDuration', () => {
        beforeEach(() => {
        });

        it('indicates that the duration is too long', () => {
          props.isTooLong = true;
          expect(trackList().find('.duration').is('.too-long')).toBe(true);
        });
      });
    });

    describe('props.list behavior', () => {
      it('includes the list as a selector', () => {
        expect(trackList().is(`.${props.list}`)).toBe(true);
      });

      it('includes the list as an h3', () => {
        expect(trackList().find('h3').text()).toContain(props.list)
      });
    });

    describe('props.tracks behavior', () => {
      it('renders a <Track> for each track', () => {
        props.listTracks = [{id: 1}, {id: 2}];
        expect(trackList().find(Track).length).toBe(2);
      });
    });
  });
});
