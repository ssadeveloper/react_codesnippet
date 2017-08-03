import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import TopNav from '../index';

const renderComponent = () => shallow(<TopNav />);

test('Renders TopNav', () => {
  const topNav = renderComponent();
  expect(topNav).toContain('#top-nav');
});

test('Renders Logo inside wrapper', () => {
  const topNav = renderComponent();
  expect(topNav).toContain('Logo');
});

test('Renders Controls inside wrapper', () => {
  const topNav = renderComponent();
  expect(topNav).toContain('Controls');
});
