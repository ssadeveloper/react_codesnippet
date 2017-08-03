import React from 'react';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CardLoading from 'components/_common/CardLoading';

function shallowRender() {
  return shallow(<CardLoading />);
}

test('Renders a Card with `loading` modifier', () => {
  const component = shallowRender();
  expect(component).toContain('Card');
  expect(component.find('Card').props().modifiers).toContain('loading');
});

test('Renders four GhostIndicator components', () => {
  const component = shallowRender();
  expect(component.find('GhostIndicator').length).toEqual(4);
});

test('First GhostIndicator has `bottomGap` modifier', () => {
  const component = shallowRender();
  expect(component.find('GhostIndicator').first().props().modifiers).toContain('bottomGap');
});
