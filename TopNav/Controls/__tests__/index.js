import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import Controls from '../index';

const shallowRender = () => shallow(<Controls />);

test('Renders a connected SearchContainer inside wrapper', () => {
  const component = shallowRender();
  expect(component).toContain('Connect(withRouter(SearchContainer))');
});

test('Renders AddNew inside wrapper', () => {
  const component = shallowRender();
  expect(component).toContain('AddNew');
});

test('Renders Notifications inside wrapper', () => {
  const component = shallowRender();
  expect(component).toContain('Notifications');
});

test('Renders UserProfile inside wrapper', () => {
  const component = shallowRender();
  expect(component).toContain('UserProfile');
});

test('Renders VerticalDivider inside wrapper', () => {
  const component = shallowRender();
  expect(component).toContain('VerticalDivider');
});
