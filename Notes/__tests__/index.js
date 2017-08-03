import React from 'react';
import { fromJS, Map } from 'immutable';
import { noop } from 'lodash';

import {
  test,
  expect,
  shallow,
  createSpy,
  spyOn,
} from '__tests__/helpers/test-setup';

import Notes, { buildSelectedRecipientOptions } from '../index';
import {
  COMPOSER_ERROR,
  COMPOSER_HIDDEN,
  COMPOSER_INVISIBLE,
  COMPOSER_NO_RECIPIENTS,
  COMPOSER_VISIBLE,
  SCROLLABLE_COMPOSER_NAME,
} from '../constants';
import { selectedRecipientsforApi } from '../utils';

const caseInfo = fromJS({
  id: '123',
  unreadNotesCount: 0,
});

const user = {
  firstName: 'George',
  lastName: 'Thomas',
  email: 'test_user_email@fake.com',
};

const group = {
  companyName: 'Trucker Central Inc.',
};

const recip1 = {
  firstName: 'Bobby',
  lastName: 'Flay',
  email: 'test_recip1_email@fake.com',
};

const group1 = {
  companyName: 'Mr. Fixer Inc.',
};

const recip2 = {
  firstName: 'Tim',
  lastName: 'McGraw',
  email: 'test_recip2_email@fake.com',
};

const group2 = {};

const recipients = [
  { user: recip1, group: group1 },
  { user: recip2, group: group2 },
];

const sentAt = new Date(2000, 0, 1);

const caseNotes = fromJS([
  {
    id: 32123,
    recipients,
    sender: {
      user,
      group,
    },
    sentAt: sentAt.toISOString(),
    status: 'unread',
  },
]);

const user1 = {
  email: 'abc@abc.com',
  id: '333',
  firstName: 'Bill',
  lastName: 'Lentz',
};
const user2 = {
  email: 'hey@gmail.com',
  id: '353',
  firstName: 'Sara',
  lastName: 'Howes',
};
const user3 = {
  email: 'hey@gmail.com',
  id: '453',
  firstName: 'New',
  lastName: 'User',
};
const caseRecipients = fromJS({
  data: [
    {
      group: {
        companyName: 'Volvo',
        id: '12',
      },
      user: user1,
    },
    {
      group: {
        companyName: 'Mack',
        id: '23',
      },
      user: user2,
    },
    {
      group: {
        companyName: 'Volvo',
        id: '12',
      },
      user: user3,
    },
  ],
});

const notesOptions = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

const notesOptionsPlaceholder = 'Placeholder';

const onChangeNoteOption = () => {};

const loadCaseRecipients = () => {};

const postCaseNote = () => {};

const selectedNoteOption = notesOptions[0];

const updateNoteStatus = noop;

const defaultProps = {
  caseInfo,
  caseNotes,
  caseRecipients,
  notesOptions,
  notesOptionsPlaceholder,
  onChangeNoteOption,
  loadCaseRecipients,
  postCaseNote,
  selectedNoteOption,
  updateNoteStatus,
};

const selectedRecipients = [
  {
    companyName: 'Volvo',
    groupId: '12',
    isInTree: true,
    label: 'Bill Lentz',
    userId: '333',
    value: '333',
  },
  {
    companyName: 'Mack',
    groupId: '23',
    isInTree: true,
    label: 'Sara Howes',
    userId: '353',
    value: '353',
  },
  {
    companyName: 'Volvo',
    groupId: '12',
    isInTree: true,
    label: 'New User',
    userId: '453',
    value: '453',
  },
];

function shallowRender(props = defaultProps) {
  return shallow(<Notes {...props} />);
}

test('renders a WidgetHeader with the expected note when no notes are unread', () => {
  const component = shallowRender();
  expect(component).toContain('WidgetHeader');
  expect(component.find('WidgetHeader')).toHaveProp('note', '');
});

test('renders a WidgetHeader with the expected note when 1 or more notes are unread', () => {
  const caseInfoWithUnreadNotes = Map({ unreadNotesCount: 3 });
  const props = {
    ...defaultProps,
    caseInfo: caseInfoWithUnreadNotes,
  };
  const component = shallowRender(props);
  expect(component.find('WidgetHeader')).toHaveProp('note', '(3 unread)');
});

test('renders a NotesOptionsBar with the expected props', () => {
  const component = shallowRender();
  expect(component).toContain('NotesOptionsBar');
  expect(component.find('NotesOptionsBar')).toHaveProps({
    notesOptions: defaultProps.notesOptions,
    onChangeNoteOption: defaultProps.onChangeNoteOption,
    selectedNoteOption: defaultProps.selectedNoteOption,
  });
});

test('renders a Note for each note passed through props', () => {
  const component = shallowRender();
  expect(component.find('Note').length).toEqual(caseNotes.count());
});

// ------------------------------ Note Creator ------------------------------

test('renders a react-scroll component that has correct `name` prop and wraps the NoteCreator', () => {
  const component = shallowRender().find('.react-scroll-element');
  expect(component.length).toEqual(1);
  expect(component).toHaveProp('name', SCROLLABLE_COMPOSER_NAME);
  expect(component).toContain('NoteCreator');
});

test('renders a NoteCreator with correct props', () => {
  const component = shallowRender();
  expect(component).toContain('NoteCreator');
  const composerStatus = COMPOSER_VISIBLE;
  component.setState({ composerStatus });
  expect(component.find('NoteCreator')).toHaveProps({
    caseRecipients,
    composerStatus,
    handleClickCancel: component.handleClickCancel,
    handleClickNewNote: component.handleClickNewNote,
    handleClickPostNote: component.handleClickPostNote,
  });
});

test('handleClickNewNote scrolls to the note editor and loads the recipients', () => {
  const testLoadCaseRecipients = createSpy();
  const props = {
    ...defaultProps,
    loadCaseRecipients: testLoadCaseRecipients,
  };
  const component = shallowRender(props);
  const instance = component.instance();
  const scrollToNoteCreator = spyOn(instance, 'scrollToNoteCreator');
  instance.handleClickNewNote();
  expect(scrollToNoteCreator).toHaveBeenCalled();
  expect(testLoadCaseRecipients).toHaveBeenCalled(caseInfo.get('id'));

  // also works when we're in the error state
  component.setState({ composerStatus: COMPOSER_ERROR });
  instance.handleClickNewNote();
  expect(scrollToNoteCreator).toHaveBeenCalled();
  expect(testLoadCaseRecipients).toHaveBeenCalled(caseInfo.get('id'));
});

test('handleClickNewNote sets composerStatus to COMPOSER_VISIBLE if it is COMPOSER_HIDDEN', () => {
  const component = shallowRender();
  const instance = component.instance();
  component.setState({ composerStatus: COMPOSER_HIDDEN });
  instance.handleClickNewNote();
  expect(component.state('composerStatus')).toEqual(COMPOSER_VISIBLE);
});

// ------------------------------ componentWillReceiveProps ------------------------------

test('successful recipients load sets the composer status to visible', () => {
  const component = shallowRender({ ...defaultProps, caseRecipients: Map({}) });
  const instance = component.instance();
  expect(component).toHaveState({ composerStatus: COMPOSER_INVISIBLE });
  const newProps = {
    caseRecipients: fromJS({ requesting: false, error: false, data: recipients }),
  };
  instance.componentWillReceiveProps(newProps);
  expect(component).toHaveState({ composerStatus: COMPOSER_VISIBLE });
});

test('error during recipients load sets the composer status to error', () => {
  const component = shallowRender({ ...defaultProps, caseRecipients: Map({}) });
  const instance = component.instance();
  const newProps = {
    caseRecipients: fromJS({ requesting: false, error: true }),
  };
  instance.componentWillReceiveProps(newProps);
  expect(component).toHaveState({ composerStatus: COMPOSER_ERROR });
});

test('if no recipients are found the composer status is set to no-recipients', () => {
  const component = shallowRender({ ...defaultProps, caseRecipients: Map({}) });
  const instance = component.instance();
  const newProps = {
    caseRecipients: fromJS({ requesting: false, error: false, data: [] }),
  };
  instance.componentWillReceiveProps(newProps);
  expect(component).toHaveState({ composerStatus: COMPOSER_NO_RECIPIENTS });
});

// ------------------------------ buildSelectedRecipientOptions ------------------------------
test('buildSelectedRecipientOptions returns correct selected options for recipients', () => {
  const output = buildSelectedRecipientOptions(caseRecipients.get('data'));
  expect(output).toEqual(selectedRecipients);
});

// ------------------------------ focusTextArea ------------------------------
test('focusTextArea calls focus method of the param element if shouldFocusTextArea is true', () => {
  const focus = createSpy();
  const textarea = { focus };
  const component = shallowRender();
  const instance = component.instance();
  component.setState({ shouldFocusTextArea: true });
  instance.focusTextArea(textarea);
  expect(focus).toHaveBeenCalled();
});

test('focusTextArea does not call focus method of the param element if shouldFocusTextArea is false', () => {
  const focus = createSpy();
  const textarea = { focus };
  const component = shallowRender();
  const instance = component.instance();
  component.setState({ shouldFocusTextArea: false });
  instance.focusTextArea(textarea);
  expect(focus).toNotHaveBeenCalled();
});

// ------------------------------ handleChangeRecipient ------------------------------
test('handleChangeRecipient updates state with the new value', () => {
  const value = [{
    someRecipient: 'some value',
  }];
  const component = shallowRender();
  const instance = component.instance();
  instance.handleChangeRecipient(value);
  expect(component.state('selectedRecipients')).toEqual(value);
});

// ------------------------------ handleClickCancel ------------------------------
test('handleClickCancel updates sets the component status to COMPOSER_HIDDEN', () => {
  const component = shallowRender();
  const instance = component.instance();
  component.setState({ composerStatus: COMPOSER_VISIBLE });
  instance.handleClickCancel();
  expect(component.state('composerStatus')).toEqual(COMPOSER_HIDDEN);
});

// ------------------------------ handleClickReply ------------------------------
test('handleClickReply updates state with the new value', () => {
  const component = shallowRender();
  const instance = component.instance();
  instance.handleClickReply(caseRecipients.get('data'));
  expect(component.state('selectedRecipients')).toEqual(selectedRecipients);
});

// ------------------------------ handleClickPostNote ------------------------------
test('handleClickPostNote calls postCaseNote prop function with correct payload', () => {
  const testPostCaseNote = createSpy();
  const testCaseId = '12345';
  const testCaseInfo = fromJS({ id: testCaseId });
  const testProps = {
    ...defaultProps,
    caseInfo: testCaseInfo,
    postCaseNote: testPostCaseNote,
  };
  const testMessage = 'some note';

  const component = shallowRender(testProps);
  const instance = component.instance();
  component.setState({ selectedRecipients });
  instance.handleClickPostNote(testMessage);
  expect(testPostCaseNote).toHaveBeenCalledWith({
    caseId: testCaseId,
    params: {
      recipients: selectedRecipientsforApi(selectedRecipients),
      message: testMessage,
    },
  });

  // also resets the recipients field & composerStatus
  expect(component.state('selectedRecipients').length).toBe(0);
  expect(component.state('composerStatus')).toBe(COMPOSER_HIDDEN);
});
