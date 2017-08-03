import React from 'react';
import { fromJS } from 'immutable';
import moment from 'moment';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseInfo from '../CaseInfo';
import messages from '../messages';

const caseInfo = fromJS({
  id: '1234',
  estimateTotal: '$23,848.23',
  approvalStatus: 'Approved',
  repairStatus: 'Pending',
  etr: moment().toISOString(),
  downtime: '3 days, 3 hours',
});

const defaultProps = {
  caseInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<CaseInfo {...props} />);
}

test('Renders a CardElement', () => {
  const component = shallowRender();
  expect(component).toBeA('CardElement');
});

test('Renders a CardTable with four CardTableRows', () => {
  const component = shallowRender();
  expect(component).toContain('CardTable');
  expect(component.find('CardTable').find('CardTableRow').length).toEqual(4);
});

test('Renders the status label and message on the first CardTableRow', () => {
  const component = shallowRender();
  const statusRow = component.find('CardTableRow').first();

  const th = statusRow.find('th');
  expect(th).toContain('FormattedMessage');
  expect(th.find('FormattedMessage')).toHaveProps({
    ...messages.status,
  });

  expect(statusRow.find('td').render().text()).toContain(caseInfo.get('repairStatus'));
});

test('Renders the StatusSpan with no status modifier if no approvalStatus is supplied', () => {
  const testCaseInfo = caseInfo.set('approvalStatus', undefined);
  const testProps = { caseInfo: testCaseInfo };
  const component = shallowRender(testProps);

  expect(component).toContain('StatusSpan');
  expect(component.find('StatusSpan').props()).toContain({
    modifiers: ['bold', 'tall', 'uppercase'],
  });
});

test(
  'Renders the ETR label, and ETR component with the expected props on the third CardTableRow',
  () => {
    const component = shallowRender();
    const etrRow = component.find('CardTableRow').at(1);

    const th = etrRow.find('th');
    expect(th).toContain('FormattedMessage');
    expect(th.find('FormattedMessage')).toHaveProps({
      ...messages.etr,
    });

    const td = etrRow.find('td');
    expect(td).toContain('ETR');
    expect(td.find('ETR')).toHaveProp('caseInfo', caseInfo);
  },
);

test('Renders the downtime label and message on the fourth CardTableRow', () => {
  const component = shallowRender();
  const downtimeRow = component.find('CardTableRow').at(2);

  const th = downtimeRow.find('th');
  expect(th).toContain('FormattedMessage');
  expect(th.find('FormattedMessage')).toHaveProps({
    ...messages.downtime,
  });

  expect(downtimeRow.find('td').render().text()).toContain(caseInfo.get('downtime'));
});

test('Renders the estimate label, value, and status on the second CardTableRow', () => {
  const component = shallowRender();
  const estimateRow = component.find('CardTableRow').last();

  const th = estimateRow.find('th');
  expect(th).toContain('FormattedMessage');
  expect(th.find('FormattedMessage')).toHaveProps({
    ...messages.estimate,
  });

  const firstTdText = estimateRow.find('td').first().render().text();
  expect(firstTdText).toContain(caseInfo.get('estimateTotal'));
  const lastTdText = estimateRow.find('td').last().render().text();
  expect(lastTdText).toContain(caseInfo.get('approvalStatus'));
});
