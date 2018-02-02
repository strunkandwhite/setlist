import React from 'react';
import { shallow } from 'enzyme';
import ImportForm from './ImportForm';

it('renders without crashing', () => {
  const fn = () => {};

  shallow(
    <ImportForm
      handleImportFormSubmit={fn}
    />
  );
});
