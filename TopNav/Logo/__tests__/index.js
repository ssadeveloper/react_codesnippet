import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import Logo from '../index';

const renderComponent = () => shallow(<Logo />);

test('Check if the logo links to the root path', () => {
  const logo = renderComponent();
  expect(logo).toContain('Link[to="/"]');
});
