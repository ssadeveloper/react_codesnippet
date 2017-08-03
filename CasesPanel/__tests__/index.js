import React from 'react';
import { noop } from 'lodash';
import {
  test,
  expect,
  shallow,
  spyOn,
} from '__tests__/helpers/test-setup';
import { List, Map } from 'immutable';

import CasesPanel from '../index';

const defaultProps = {
  cases: List(),
  casesView: '',
  favoritePagination: Map(),
  refreshCases: noop,
  requestNext: noop,
};

function shallowRender(props = defaultProps) {
  return shallow(<CasesPanel {...props} />);
}

test('CasesPanel contains CategoryHeader', () => {
  const component = shallowRender();
  expect(component).toContain('CategoryHeader');
});

test('CasesPanel renders a FavoritesPaginator by default', () => {
  const component = shallowRender();
  expect(component).toContain('FavoritesPaginator');
});

test('CasesPanel renders a card view with casesView === card', () => {
  const component = shallowRender({ ...defaultProps, casesView: 'card' });
  expect(component.find('FavoritesPaginator').dive()).toContain('CasesCardView');
});

test('CasesPanel renders a list view with casesView === list', () => {
  const component = shallowRender({ ...defaultProps, casesView: 'list' });
  expect(component.find('FavoritesPaginator').dive()).toContain('CasesListView');
});

test('CasesPanel renders a map view with casesView === map', () => {
  const component = shallowRender({ ...defaultProps, casesView: 'map' });
  expect(component.find('FavoritesPaginator').dive()).toContain('CasesMapView');
});

test('CasesPanel builds a new case view if the casesView prop changes', () => {
  const component = shallowRender({ ...defaultProps, casesView: 'card' });
  const instance = component.instance();
  const viewBuilderSpy = spyOn(instance, 'buildPaginatedCasesView');
  expect(viewBuilderSpy).toNotHaveBeenCalled();
  instance.componentWillReceiveProps({ casesView: 'list' });
  expect(viewBuilderSpy).toHaveBeenCalledWith('list');
});
