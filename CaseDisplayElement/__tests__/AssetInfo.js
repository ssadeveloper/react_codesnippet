import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import AssetInfo from '../AssetInfo';
import messages from '../messages';

const assetInfo = fromJS({
  id: '1234',
  unitNumber: '54321',
  vinNumber: '67890',
});

const defaultProps = {
  assetInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<AssetInfo {...props} />);
}

test('Renders a CardElement', () => {
  const component = shallowRender();
  expect(component).toBeA('CardElement');
});

test('Renders a CardTable and two CardTableRows', () => {
  const component = shallowRender();
  expect(component).toContain('CardTable');
  expect(component.find('CardTableRow').length).toEqual(2);
});

test('Renders a FormattedMessage with the expected props in the first CardTableRow', () => {
  const component = shallowRender();
  const row1 = component.find('CardTableRow').first();
  expect(row1).toContain('FormattedMessage');
  expect(row1.find('FormattedMessage')).toHaveProps({ ...messages.unit });
});

test('Renders the expected value in the first CardTableRow', () => {
  const component = shallowRender();
  const row1 = component.find('CardTableRow').first();
  expect(row1).toContain('td');
  expect(row1.find('td').render().text()).toInclude(assetInfo.get('unitNumber'));
});

test('Renders a FormattedMessage with the expected props in the second CardTableRow', () => {
  const component = shallowRender();
  const row1 = component.find('CardTableRow').last();
  expect(row1).toContain('FormattedMessage');
  expect(row1.find('FormattedMessage')).toHaveProps({ ...messages.vin });
});

test('Renders the expected value in the first CardTableRow', () => {
  const component = shallowRender();
  const row1 = component.find('CardTableRow').last();
  expect(row1).toContain('td');
  expect(row1.find('td').render().text()).toInclude(assetInfo.get('vinNumber'));
});
