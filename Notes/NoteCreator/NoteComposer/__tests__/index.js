import React from 'react';
import { fromJS } from 'immutable';

import {
  test,
  expect,
  shallow,
  createSpy,
} from '__tests__/helpers/test-setup';

import NoteComposer from '../index';
import messages from '../messages';

const caseRecipients = fromJS({
  data: [],
});

const selectedRecipients = [
  {
    label: 'test user name',
    value: {},
  },
];

const defaultProps = {
  caseRecipients,
  handleChangeRecipient: () => true,
  handleClickCancel: () => true,
  handleClickPostNote: () => true,
  selectedRecipients,
};

function shallowRender(props = defaultProps) {
  return (shallow(<NoteComposer {...props} />));
}

test('renders a title NoteComposerLabel', () => {
  const component = shallowRender().find('NoteComposerLabel FormattedMessage').first();
  expect(component).toHaveProps({ ...messages.title });
});

test('renders a `To:` NoteComposerLabel', () => {
  const component = shallowRender().find('NoteComposerLabel FormattedMessage').at(1);
  expect(component).toHaveProps({ ...messages.to });
});

test('renders a NoteComposerSelect with correct props', () => {
  const component = shallowRender();
  expect(component).toContain('NoteComposerSelect');
  expect(component.find('NoteComposerSelect')).toHaveProps({
    caseRecipients: caseRecipients.get('data'),
    handleChangeRecipient: defaultProps.handleChangeRecipient,
    selectedRecipients,
  });
});

test('renders a Textarea component with correct props', () => {
  const testMessage = 'test note value';
  const component = shallowRender();
  component.setState({ message: testMessage });
  expect(component).toContain('Textarea');
  expect(component.find('Textarea')).toHaveProps({
    onChange: component.handleChangeMessage,
    value: testMessage,
  });
});

test('renders a `Cancel` RectangleButton', () => {
  const component = shallowRender().find('RectangleButton').first();
  expect(component.find('RectangleButtonText FormattedMessage')).toHaveProps({
    ...messages.cancelButton,
  });
});

test('onClick event of `Cancel` button is wired with handleClickCancel prop', () => {
  const component = shallowRender().find('RectangleButton').first();
  expect(component).toHaveProps({
    onClick: defaultProps.handleClickCancel,
  });
});

test('renders a `Post` RectangleButton', () => {
  const component = shallowRender().find('RectangleButton').at(1);
  expect(component.find('RectangleButtonText FormattedMessage')).toHaveProps({
    ...messages.postButton,
  });
});

test('onClick event of `Post` button is wired with handleClickPostNote function', () => {
  const component = shallowRender().find('RectangleButton').at(1);
  expect(component).toHaveProps({
    onClick: component.handleClickPostNote,
  });
});

// ------------------------------ handleChangeMessage ------------------------------
test('handleChangeMessage updates `message` state', () => {
  const testValue = 'test target message';
  const syntheticEvent = {
    target: {
      value: testValue,
    },
  };
  const component = shallowRender();
  const instance = component.instance();
  instance.handleChangeMessage(syntheticEvent);
  expect(component.state('message')).toBe(testValue);
});

// ------------------------------ handleClickPostNote ------------------------------
test('handleClickPostNote calls props.handleClickPostNote with correct message param', () => {
  const testHandleClickPostNote = createSpy();
  const testProps = {
    ...defaultProps,
    handleClickPostNote: testHandleClickPostNote,
  };
  const testMessage = 'test message for handleClickPostNote';
  const component = shallowRender(testProps);
  component.setState({ message: testMessage });
  const instance = component.instance();
  instance.handleClickPostNote();
  expect(testHandleClickPostNote).toHaveBeenCalledWith(testMessage);

  // also resets `message` state
  expect(component.state('message')).toBe('');
});
