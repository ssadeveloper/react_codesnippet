import React from 'react';
import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';
import { fromJS, List } from 'immutable';

import CasesMapView from '../CasesMapView';

const defaultProps = {
  cases: List(),
};

function renderComponent(props = defaultProps) {
  return shallow(<CasesMapView {...props} />);
}

test('CasesMapView renders a "TODO" title', () => {
  const component = renderComponent();
  expect(component.find('h2').text()).toInclude('TODO:');
});

test('CasesMapView renders one link per case', () => {
  const cases = fromJS([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]);
  const component = renderComponent({ ...defaultProps, cases });
  expect(component.find('ul').length).toEqual(1);
  expect(component.find('li').length).toEqual(3);
  expect(component.find('Link').length).toEqual(3);
});
