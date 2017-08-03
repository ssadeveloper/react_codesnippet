import React from 'react';
import { noop } from 'lodash';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import UserProfile from '../index';

function renderComponent() {
  return shallow(<UserProfile />);
}

function testExpandedStateChange(initialExpandedState = false) {
  const component = renderComponent();
  component.setState({ expanded: initialExpandedState });
  component.simulate('click');
  const expandedState = component.state('expanded');
  expect(expandedState).toEqual(!initialExpandedState);
}

test('Clicking an unexpanded component sets expanded to true', () => {
  testExpandedStateChange(false);
});

test('Clicking an expanded component sets expanded to false', () => {
  testExpandedStateChange(true);
});

test('when expanded, calling hidePopupMenu collapses the menu', () => {
  const userProfile = renderComponent();
  userProfile.simulate('click');
  expect(userProfile.state('expanded')).toEqual(true);
  const event = { stopPropagation: noop };
  userProfile.instance().hidePopupMenu(event);
  expect(userProfile.state('expanded')).toEqual(false);
});

test('when not expanded, calling hidePopupMenu does not expand the menu', () => {
  const userProfile = renderComponent();
  expect(userProfile.state('expanded')).toEqual(false);
  const event = { stopPropagation: noop };
  userProfile.instance().hidePopupMenu(event);
  expect(userProfile.state('expanded')).toEqual(false);
});
