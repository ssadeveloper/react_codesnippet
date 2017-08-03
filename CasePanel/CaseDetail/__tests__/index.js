import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseDetail from '../index';

test('Renders the correct component', () => {
  const component = shallow(<CaseDetail />);
  expect(component).toBeA('Grid');
});
