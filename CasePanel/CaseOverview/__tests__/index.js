import { Map } from 'immutable';
import React from 'react';

import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CaseOverview from '../index';

const defaultProps = {
  collapsed: false,
  latestFavorite: {},
};

function shallowRender(props = defaultProps) {
  return shallow(<CaseOverview {...props} />);
}

test('Renders a CaseOverviewWrapper', () => {
  const component = shallowRender();
  expect(component).toContain('SplitBlock');
});

test('Includes a BreadCrumbLink with expected props', () => {
  const component = shallowRender();
  expect(component).toContain('BreadCrumbLink');
  expect(component.find('BreadCrumbLink')).toHaveProps({ ...defaultProps });
});

test('Includes a PageHeadingTitle', () => {
  const component = shallowRender();
  expect(component).toContain('PageHeadingTitle');
});

test('Includes an asset information table', () => {
  const component = shallowRender();
  expect(component).toContain('Table[id="case-overview-asset-information"]');
});

test('Includes a SeverityLabel with expected props', () => {
  const caseInfo = Map({
    severityColor: 'yellow',
    severityCount: '2',
  });
  const component = shallowRender({ ...defaultProps, caseInfo });
  expect(component).toContain('SeverityLabel');
  expect(component.find('SeverityLabel')).toHaveProps({
    color: caseInfo.get('severityColor'),
    value: Number(caseInfo.get('severityCount')),
  });
});

test('Includes UnreadNoteLabel if there are unread notes', () => {
  const count = 2;
  const caseInfo = Map({ unreadNotesCount: `${count}` });
  const component = shallowRender({ ...defaultProps, caseInfo });
  expect(component).toContain('UnreadNoteLabel');
  expect(component.find('UnreadNoteLabel')).toHaveProp('count', count);
});

test('Does not include UnreadNoteLabel if no unread notes', () => {
  const caseInfo = Map({ unreadNotesCount: '0' });
  const component = shallowRender({ ...defaultProps, caseInfo });
  expect(component).toNotContain('UnreadNoteLabel');
});
