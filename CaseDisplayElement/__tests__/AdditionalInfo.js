import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import AdditionalInfo from '../AdditionalInfo';

const caseInfo = fromJS({
  followUpColor: 'red',
  followUpTime: '2017-01-11T16:46:22Z',
  unreadNotesCount: 10,
});

const defaultProps = {
  caseInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<AdditionalInfo {...props} />);
}

test('Renders a CardElement', () => {
  const component = shallowRender();
  expect(component).toBeA('CardElement');
});

test('Renders an UnreadNotesLabel with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('UnreadNotesLabel');
  expect(component.find('UnreadNotesLabel')).toHaveProp('caseInfo', caseInfo);
});

test('Renders a FollowUpLabel with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('FollowUpLabel');
  expect(component.find('FollowUpLabel')).toHaveProp('caseInfo', caseInfo);
});
