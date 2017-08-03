import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseListRow from '../CaseListRow';

const caseInfo = fromJS({
  approvalStatus: 'Pending',
  id: '123',
});

const assetInfo = fromJS({
  id: '456',
});

const serviceProviderInfo = fromJS({
  id: '789',
});

const defaultProps = {
  caseInfo,
  assetInfo,
  serviceProviderInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<CaseListRow {...props} />);
}

test('Renders a table row', () => {
  const component = shallowRender();
  expect(component).toBeA('tr');
});

test('Passes the correct modifier to the status component', () => {
  const component = shallowRender();
  const approvalSpan = component.find('StatusSpan');
  expect(approvalSpan.props().modifiers).toContain('pending');
});

test('Removes invalid modifiers from props', () => {
  const newCaseInfo = fromJS({ ...caseInfo, approvalStatus: null });
  const component = shallowRender({ ...defaultProps, caseInfo: newCaseInfo });
  const approvalSpan = component.find('StatusSpan');
  // this status span has three modifiers by default
  expect(approvalSpan.props().modifiers.length).toEqual(3);
});
