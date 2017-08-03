import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import ServiceProvider from '../ServiceProvider';

const serviceProviderInfo = fromJS({
  id: '1234',
  companyName: 'Test company',
});

const defaultProps = {
  serviceProviderInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<ServiceProvider {...props} />);
}

test('Renders a CardElement', () => {
  const component = shallowRender();
  expect(component).toBeA('CardElement');
});

test('Renders a TextDiv', () => {
  const component = shallowRender();
  expect(component).toContain('TextDiv');
});

test('Renders the Service Providers name within the TextDiv', () => {
  const component = shallowRender();
  const textDiv = component.find('TextDiv');
  expect(textDiv.render().text()).toInclude(serviceProviderInfo.get('companyName'));
});
