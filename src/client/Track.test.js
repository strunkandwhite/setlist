import React from 'react';
import { shallow } from 'enzyme';
import WrappedTrack from './Track';

it('renders without crashing', () => {
  const Track = WrappedTrack.DecoratedComponent;
  const identity = el => el;
  const fn = () => {};

  shallow(
    <Track
      artist='foo'
      bpm='0'
      buttonDir='>'
      id='bar'
      index={0}
      length='0'
      list='baz'
      name='qunx'
      type='qiz'
      isDragging={false}
      connectDragSource={identity}
      connectDropTarget={fn}
      handleTrackBPMChange={fn}
      handleRemoveTrackClick={fn}
      handleSwitchTrackClick={fn}
      moveTrack={fn}
    />
  );
});
