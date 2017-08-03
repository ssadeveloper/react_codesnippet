import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import AddNew from '../index';

const renderComponent = () => shallow(<AddNew />);

test('Renders a <div> tag', () => {
  const component = renderComponent();
  expect(component).toContain('CircleButton');
});
