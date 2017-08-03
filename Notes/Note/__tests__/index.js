import React from 'react';
import { fromJS, Map } from 'immutable';
import { noop } from 'lodash';

import {
  test,
  expect,
  shallow,
  createSpy,
} from '__tests__/helpers/test-setup';

import Note, {
  buildUserLabel,
  buildSentAt,
  buildRecipientText,
} from '../index';

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

const note = fromJS({
  recipients,
  sender: {
    user,
    group,
  },
  sentAt: sentAt.toISOString(),
  status: 'unread',
});

const defaultProps = {
  handleClickReply: noop,
  note,
  updateNoteStatus: noop,
};

function shallowRender(props = defaultProps) {
  return shallow(<Note {...props} />);
}

/* ----------------------- buildUserLabel --------------------------- */

test('returns the expected string with first name, last name, and company name', () => {
  const iUser = fromJS(user);
  const iGroup = fromJS(group);
  const label = buildUserLabel(iUser, iGroup);
  expect(label).toEqual(
    `${iUser.get('firstName')} ${iUser.get('lastName')} (${iGroup.get('companyName')})`,
  );
});

test('returns the expected string with no user name provided', () => {
  const iUser = null;
  const iGroup = fromJS(group);
  const label = buildUserLabel(iUser, iGroup);
  expect(label).toEqual(`(${iGroup.get('companyName')})`);
});

test('returns the expected string with no companyName provided', () => {
  const iUser = fromJS(user);
  const iGroup = Map();
  const label = buildUserLabel(iUser, iGroup);
  expect(label).toEqual(`${iUser.get('firstName')} ${iUser.get('lastName')} `);
});

/* ----------------------- buildSentAt --------------------------- */

test('generates the expected moment object', () => {
  const time = buildSentAt(note);
  expect(time.toISOString()).toEqual(sentAt.toISOString());
});

/* ----------------------- buildRecipientText --------------------------- */

test('generates the expected recipients text', () => {
  const text = buildRecipientText(note);
  const iUser1 = fromJS(recip1);
  const iGroup1 = fromJS(group1);
  const label1 = buildUserLabel(iUser1, iGroup1);
  const iUser2 = fromJS(recip2);
  const iGroup2 = fromJS(group2);
  const label2 = buildUserLabel(iUser2, iGroup2);
  expect(text).toContain(`${label1} ${label2}`);
});

/* ----------------------- Note --------------------------- */

test('renders a NoteBlock', () => {
  expect(shallowRender()).toBeA('NoteBlock');
});

test('renders Expandable components', () => {
  const component = shallowRender();
  expect(component).toContain('ExpandableHeader');
  expect(component).toContain('ExpandableContent');
});

test('renders a Gravatar with the users email', () => {
  const component = shallowRender();
  expect(component).toContain('Gravatar');
  expect(component.find('Gravatar')).toHaveProp('email', user.email);
});

test('renders a StatusIndicator using the note as the item', () => {
  const component = shallowRender();
  expect(component).toContain('StatusIndicator');
  expect(component.find('StatusIndicator')).toHaveProp('item', note);
});

test('renders a NoteActionBar and passes down correct props', () => {
  const component = shallowRender();
  expect(component).toContain('NoteActionBar');
  expect(component.find('NoteActionBar')).toHaveProps({
    handleClickReply: component.handleClickReply,
    note,
    updateNoteStatus: defaultProps.updateNoteStatus,
  });
});

test('calling this.handleClickReply calls props.handleClickReply with correct argument', () => {
  const handleClickReply = createSpy();
  const testProps = {
    ...defaultProps,
    handleClickReply,
  };
  const replyUsers = note.get('recipients').insert(0, note.get('sender'));
  const component = shallowRender(testProps);
  const instance = component.instance();
  instance.handleClickReply();
  expect(handleClickReply).toHaveBeenCalledWith(replyUsers);
});

test('does not start timeout on mouse enter, if note status is `read`', () => {
  const testNote = note.set('status', 'read');
  const testProps = { ...defaultProps, note: testNote };
  const component = shallowRender(testProps);
  const instance = component.instance();
  component.simulate('mouseenter');
  expect(instance.hoverTimeout).toNotExist();
});

test('stops hover timer on mouse leave', () => {
  const component = shallowRender();
  const instance = component.instance();
  component.simulate('mouseleave');
  expect(instance.hoverTimeout).toNotExist();
});

test('starts timeout on mouse enter, if note status is `unread`; clears it on mouse leave', () => {
  const component = shallowRender();
  const instance = component.instance();
  component.simulate('mouseenter');
  expect(instance.hoverTimeout).toExist();
  component.simulate('mouseleave');
  expect(instance.hoverTimeout).toNotExist();
});

test('calls `updateNoteStatus` with `read` param ~3 seconds after mouse enter', () => {
  const updateNoteStatus = createSpy();
  const component = shallowRender({ ...defaultProps, updateNoteStatus });
  component.simulate('mouseenter');
  setTimeout(() => {
    expect(updateNoteStatus).toHaveBeenCalledWith('read');
  }, 3500); // <-- Considering the potential delay, sets this time a bit over 3 seconds
});
