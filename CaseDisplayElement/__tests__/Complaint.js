import React from 'react';
import { fromJS } from 'immutable';

import { test, expect, shallow, mount, MountableTestComponent } from '__tests__/helpers/test-setup';

import Complaint from '../Complaint';
import messages from '../messages';

const caseInfo = fromJS({
  complaint: {
    code: '101',
    description: 'This is a serious problem',
  },
  description: 'Engine makes funny noise',
});

const defaultProps = {
  caseInfo,
};

function shallowRender(props = defaultProps) {
  return shallow(<Complaint {...props} />);
}

function mountComponent(props = defaultProps) {
  return mount(
    <MountableTestComponent>
      <Complaint {...props} />
    </MountableTestComponent>,
  );
}

test('Renders a CardElement', () => {
  expect(shallowRender()).toBeA('CardElement');
});

test('Renders a Popover, PopoverTarget, and PopoverContent elements', () => {
  const component = shallowRender();
  expect(component).toContain('WrappedPopover'); // Because Popover is exported through another file
  expect(component).toContain('PopoverTarget');
  expect(component).toContain('PopoverContent');
});

test('Popover has prop showOnHover', () => {
  const component = shallowRender();
  const popover = component.find('WrappedPopover');
  expect(popover).toHaveProp('showOnHover', true);
});

test('PopoverTarget renders the complaint title, subtitle, and description', () => {
  const component = shallowRender();
  const popoverTarget = component.find('PopoverTarget');
  expect(popoverTarget.find('TextDiv').length).toEqual(3);

  const titleDiv = popoverTarget.find('TextDiv').first();
  expect(titleDiv).toContain('FormattedMessage');
  expect(titleDiv.find('FormattedMessage')).toHaveProps({
    ...messages.complaintTitle,
  });

  const subtitleDivText = popoverTarget.find('TextDiv').at(1).render().text();
  expect(subtitleDivText).toContain(caseInfo.getIn(['complaint', 'code']));
  expect(subtitleDivText).toContain(caseInfo.getIn(['complaint', 'description']));

  const descriptionDiv = popoverTarget.find('TextDiv').last();
  expect(descriptionDiv.render().text()).toContain(caseInfo.get('description'));
});

test('Complaint subtitle is default if complaint code is blank', () => {
  const testCaseInfo = caseInfo.setIn(['complaint', 'code'], undefined);
  const testProps = { caseInfo: testCaseInfo };
  const component = mountComponent(testProps);
  expect(component.render().text()).toContain(messages.undefinedComplaintSubTitle.defaultMessage);
});

test('Complaint subtitle is default if complaint code description is blank', () => {
  const testCaseInfo = caseInfo.setIn(['complaint', 'description'], undefined);
  const testProps = { caseInfo: testCaseInfo };
  const component = mountComponent(testProps);
  expect(component.render().text()).toContain(messages.undefinedComplaintSubTitle.defaultMessage);
});

test('PopoverContent renders the complaint subtitle and description', () => {
  const component = shallowRender();
  const popoverContent = component.find('PopoverContent');
  expect(popoverContent.find('TextDiv').length).toEqual(2);

  const subtitleDivText = popoverContent.find('TextDiv').first().render().text();
  expect(subtitleDivText).toContain(caseInfo.getIn(['complaint', 'code']));
  expect(subtitleDivText).toContain(caseInfo.getIn(['complaint', 'description']));

  const descriptionDiv = popoverContent.find('TextDiv').last();
  expect(descriptionDiv.render().text()).toContain(caseInfo.get('description'));
});
