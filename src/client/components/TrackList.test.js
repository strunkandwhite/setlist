import React from 'react';
import { shallow } from 'enzyme';
import TrackList from './TrackList';
import Track from './Track';

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
      buttonDir: '>',
      list: 'foo',
      tracks: [],
      maxDuration: 0,
      duration: 0,
      handleAddSpacerClick: jest.fn(),
      handleTrackBPMChange: jest.fn(),
      handleRemoveTrackClick: jest.fn(),
      handleRemoveAllTracksClick: jest.fn(),
      handleSwitchTrackClick: jest.fn(),
      moveTrack: jest.fn()
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
        expect(trackList().find('.duration').text()).toContain(props.duration);
      });

      describe('when duration is greater than maxDuration', () => {
        beforeEach(() => {
        });

        it('indicates that the duration is too long', () => {
          props.duration = 10;
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

      describe('when rendering anything besides the \'set\' list', () => {
        it('does not render a button to add a spacer', () => {
          expect(trackList().find('.add-spacer').length).toBe(0);
        });
      });

      describe('when rendering the \'set\' list', () => {
        it('renders a button to add a spacer', () => {
          props.list = 'set';
          expect(trackList().find('.add-spacer').length).toBe(1);
        });
      });

      describe('when rendering an empty list', () => {
        it('does not render a button to remove all tracks', () => {
          expect(trackList().find('.remove-all').length).toBe(0);
        });
      });

      describe('when rendering a non-empty list', () => {
        it('renders a button to remove all tracks', () => {
          props.tracks = [{id: 1}];
          expect(trackList().find('.remove-all').length).toBe(1);
        });
      });
    });
    describe('props.tracks behavior', () => {
      it('renders a <Track> for each track', () => {
        props.tracks = [{id: 1}, {id: 2}];
        expect(trackList().find(Track).length).toBe(2);
      });
    });
  });
  describe('event handling', () => {
    describe('add spacer button', () => {
      beforeEach(() => {
        props.list = 'set';
        trackList().find('.add-spacer').simulate('click');
      });

      it('calls the handleAddSpacerClick function once when the \'add spacer\' button is clicked', () => {
        expect(props.handleAddSpacerClick.mock.calls.length).toBe(1);
      });

      it('calls the handleAddSpacerClick function with the correct argument when the \'add spacer\' button is clicked', () => {
        expect(props.handleAddSpacerClick.mock.calls[0][0]).toBe(props.list);
      });
    });

    describe('remove all button', () => {
      beforeEach(() => {
        props.tracks = [{id: 1}];
        trackList().find('.remove-all').simulate('click');
      });

      it('calls the handleRemoveAllTracksClick function once when the \'remove all\' button is clicked', () => {
        expect(props.handleRemoveAllTracksClick.mock.calls.length).toBe(1);
      });

      it('calls the handleRemoveAllTracksClick function with the correct argument when the \'remove all\' button is clicked', () => {
        expect(props.handleRemoveAllTracksClick.mock.calls[0][0]).toBe(props.list);
      });
    });
  });
});
