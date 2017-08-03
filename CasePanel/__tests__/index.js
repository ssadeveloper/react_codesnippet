import React from 'react';
import { Map } from 'immutable';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import CasePanel from '../index';

function buildCasePanel(Component = (() => <div />), caseInfo = Map()) {
  return shallow(<CasePanel Component={Component} caseInfo={caseInfo} />);
}

test('Renders the case panel', () => {
  expect(buildCasePanel()).toContain('#case-panel');
});

test('Renders an CaseDetail', () => {
  expect(buildCasePanel().find('CaseDetail').exists()).toBe(true);
});
