import React from 'react';
import { fromJS } from 'immutable';
import { test, expect, shallow } from '__tests__/helpers/test-setup';

import Complaint from '../index';

const caseDescription = 'case description';
const complaintCode = '123';
const complaintDescription = 'complaint description';
const caseInfo = fromJS({
  description: caseDescription,
  complaint: {
    code: complaintCode,
    description: complaintDescription,
  },
});

function renderComponent() {
  return shallow(<Complaint caseInfo={caseInfo} />);
}

test('Complaint renders the correct title text', () => {
  const titleLink = renderComponent().find('Title Link');
  const titleLinkChildren = titleLink.props().children;
  expect(titleLinkChildren).toContain(complaintCode);
  expect(titleLinkChildren).toContain(complaintDescription);
});

test('Complaint renders the correct detail text', () => {
  const contentText = renderComponent().find('Content').render().text();
  expect(contentText).toEqual(caseDescription);
});
