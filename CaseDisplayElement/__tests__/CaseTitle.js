import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseTitle from '../CaseTitle';
import messages from '../messages';

const caseInfo = fromJS({
  id: '1234',
  severityColor: 'red',
  severityCount: '3',
});

const defaultProps = {
  caseInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<CaseTitle {...props} />);
}

test('renders a CardElement', () => {
  expect(shallowRender()).toBeA('CardElement');
});

test('renders a Link with the correct to prop', () => {
  const component = shallowRender();
  expect(component).toContain('Link');
  expect(component.find('Link')).toHaveProp('to', `/cases/${caseInfo.get('id')}`);
});

test('renders a FormattedMessage with the expected props within the link', () => {
  const component = shallowRender();
  const link = component.find('Link');
  expect(link).toContain('FormattedMessage');
  expect(link.find('FormattedMessage').props()).toContain({
    ...messages.title,
    values: {
      caseId: caseInfo.get('id'),
    },
  });
});

test('renders a SeverityLabel with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('SeverityLabel');
  expect(component.find('SeverityLabel').props()).toContain({
    color: caseInfo.get('severityColor'),
    value: Number(caseInfo.get('severityCount')),
    small: true,
  });
});
