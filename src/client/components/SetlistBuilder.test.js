import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SetlistBuilder from './SetlistBuilder';
import ImportForm from '../containers/ImportForm';
import FilteredTrackList from '../containers/FilteredTrackList';

describe('SetlistBuilder', () => {
  let props;
  let wrapper;

  const setlistBuilder = () => {
    if(!wrapper) {
      wrapper = shallow(
        <SetlistBuilder {...props} />
      );
    }
    return wrapper;
  }

  beforeEach(() => {
    const toggleImportForm = jest.fn();
    const boundExportToText = jest.fn();

    props = {
      lists: [],
      showImport: false,
      className: 'foo',
      toggleImportForm,
      boundExportToText
    };

    wrapper = undefined;
  });

  describe('render', () => {
    it('renders without crashing', () => {
      setlistBuilder();
    });

    it('renders correctly', () => {
      const tree = renderer.create(<SetlistBuilder {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders one FilteredTrackList for each list', () => {
      props.lists = [{maxDuration: 1, list: 'foo', id: 1}, {maxDuration: 1, list: 'bar', id: 2}];
      expect(setlistBuilder().find(FilteredTrackList).length).toBe(2);
    });

    it('renders the ImportForm when props.showImport is true', () => {
      props.showImport = true;
      expect(setlistBuilder().find(ImportForm).length).toBe(1);
    });
  });
});
