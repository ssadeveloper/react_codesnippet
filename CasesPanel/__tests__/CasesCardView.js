import React from 'react';
import { fromJS, List, Map } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CasesCardView from '../CasesCardView';

const defaultProps = {
  cases: List(),
  favoritePagination: Map(),
  requesting: false,
};

function shallowRender(props = defaultProps) {
  return shallow(<CasesCardView {...props} />);
}

test('Renders a ContainerQuery', () => {
  const component = shallowRender();
  expect(component).toBeA('ContainerQuery');
});

test('CasesCardView contains CardGrid', () => {
  const component = shallowRender();
  expect(component).toContain('CardGrid');
});

test('CasesCardView renders one CaseDisplayContainer per case', () => {
  const cases = fromJS([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const component = shallowRender({ ...defaultProps, cases });
  expect(component.find('CardGrid').children().length).toEqual(3);
});

test('CasesCardView renders 8 ghost cards if no cases provided', () => {
  const component = shallowRender();
  expect(component.find('CardLoading').length).toEqual(8);
});

test('CasesCardView renders diff of cases if less than 8', () => {
  const cases = fromJS([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const favoritePagination = Map({
    totalCount: 8,
  });
  const component = shallowRender({ cases, favoritePagination, requesting: true });
  expect(component.find('CardLoading').length).toEqual(5);
});
