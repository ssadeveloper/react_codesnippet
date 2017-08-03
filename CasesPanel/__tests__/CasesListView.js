import React from 'react';
import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';
import { fromJS, List, Map } from 'immutable';

import CasesListView from '../CasesListView';

const defaultProps = {
  cases: List(),
  favoritePagination: Map(),
  requesting: false,
};

function renderComponent(props = defaultProps) {
  return shallow(<CasesListView {...props} />);
}

test('CasesListView renders a "TODO" title', () => {
  const component = renderComponent();
  expect(component).toContain('ListTable');
});

test('CasesListView renders all headers for the table', () => {
  const cases = fromJS([
    {
      id: '123',
    },
    {
      id: '456',
    },
    {
      id: '789',
    },
  ]);
  const component = renderComponent({ ...defaultProps, cases });
  const tableHeaders = component.find('th');
  expect(tableHeaders.length).toEqual(11);
});

test('CasesListView renders 10 ghost cards if no cases provided', () => {
  const component = renderComponent();
  expect(component.find('ListRowLoading').length).toEqual(10);
});

test('CasesListView renders diff of cases if less than 10', () => {
  const cases = fromJS([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const favoritePagination = Map({
    totalCount: 8,
  });
  const component = renderComponent({ cases, favoritePagination, requesting: true });
  expect(component.find('ListRowLoading').length).toEqual(5);
});
