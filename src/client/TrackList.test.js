import React from 'react';
import { shallow } from 'enzyme';
import TrackList from './TrackList';

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

  describe('basic render', () => {
    beforeEach(() => {
      const fn = jest.fn;
      props = {
        buttonDir: '>',
        list: 'foo',
        tracks: [],
        maxDuration: 0,
        duration: 0,
        handleAddSpacerClick: fn,
        handleTrackBPMChange: fn,
        handleRemoveTrackClick: fn,
        handleRemoveAllTracksClick: fn,
        moveTrack: fn
      };

      wrapper = undefined;
    });

    it('renders without crashing', () => {
      trackList();
    });

    it('renders a top-level <section>', () => {
      expect(trackList().is('section')).toBe(true);
    });

    describe('duration behavior', () => {
      it('indicates the list duration', () => {
        expect(trackList().find('.duration').text()).toContain(props.duration);
      });

      describe('when duration is greater than maxDuration', () => {
        beforeEach(() => {
          props.duration = 10;
        });

        it('indicates that the duration is too long', () => {
          expect(trackList().find('.duration').is('.too-long')).toBe(true);
        });
      });
    });

    describe('list behavior', () => {
      it('includes the list as a selector', () => {
        expect(trackList().is(`.${props.list}`)).toBe(true);
      });

      it('includes the list as an h3', () => {
        expect(trackList().find('h3').text()).toContain(props.list)
      });

      describe('when rendering anything besides the \'set\' list', () => {
        it('does not render a button to add a spacer', () => {
          expect(trackList().find('.add-spacer').length).toBe(0);
        });
      });

      describe('when rendering the \'set\' list', () => {
        beforeEach(() => {
          props.list = 'set';
        });

        it('renders a button to add a spacer', () => {
          expect(trackList().find('.add-spacer').length).toBe(1);
        });
      });

      describe('when rendering an empty list', () => {
        it('does not render a button to remove all tracks', () => {
          expect(trackList().find('.remove-all').length).toBe(0);
        });
      });

      describe('when rendering a non-empty list', () => {
        beforeEach(() => {
          props.tracks = [{id: 1}];
        });

        it('renders a button to remove all tracks', () => {
          expect(trackList().find('.remove-all').length).toBe(1);
        });
      });
    });
  });
});
