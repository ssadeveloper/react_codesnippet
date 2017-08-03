import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseCard from '../CaseCard';

const caseInfo = fromJS({
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
  return shallow(<CaseCard {...props} />);
}

test('Renders a CardViewCard', () => {
  const component = shallowRender();
  expect(component).toBeA('Card');
});

test('Renders a CaseTitle with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('CaseTitle');
  expect(component.find('CaseTitle')).toHaveProp('caseInfo', caseInfo);
});

test('Renders an AssetInfo with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('AssetInfo');
  expect(component.find('AssetInfo')).toHaveProp('assetInfo', assetInfo);
});

test('Renders a ServiceProvider with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('ServiceProvider');
  expect(component.find('ServiceProvider')).toHaveProp('serviceProviderInfo', serviceProviderInfo);
});

test('Renders a Complaint with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('Complaint');
  expect(component.find('Complaint')).toHaveProp('caseInfo', caseInfo);
});

test('Renders a CaseInfo with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('CaseInfo');
  expect(component.find('CaseInfo')).toHaveProp('caseInfo', caseInfo);
});

test('Renders a AdditionalInfo with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('AdditionalInfo');
  expect(component.find('AdditionalInfo')).toHaveProp('caseInfo', caseInfo);
});
