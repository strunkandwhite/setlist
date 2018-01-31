import React from 'react';
import { shallow } from 'enzyme';
import TrackList from './TrackList';

it('renders without crashing', () => {
  const fn = () => {};

  shallow(
    <TrackList
      buttonDir='>'
      list='set'
      tracks={[]}
      maxDuration={0}
      duration={0}
      handleAddSpacerClick={fn}
      handleTrackBPMChange={fn}
      handleRemoveTrackClick={fn}
      handleRemoveAllTracksClick={fn}
      moveTrack={fn}
    />
  );
});
