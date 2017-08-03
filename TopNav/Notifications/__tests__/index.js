import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import Notifications from '../index';

const renderComponent = () => shallow(<Notifications />);

test('Includes a CircleButton', () => {
  const component = renderComponent();
  expect(component).toContain('CircleButton');
});
