import React from 'react';
import { Map } from 'immutable';
import { noop } from 'lodash';

import {
  test,
  expect,
  shallow,
  createSpy,
} from '__tests__/helpers/test-setup';

import NoteActionBarReadUnread from '../NoteActionBarReadUnread';
import messages from '../messages';

const defaultProps = {
  note: Map({ status: 'read' }),
  updateNoteStatus: noop,
};

function shallowRender(props = defaultProps) {
  return shallow(<NoteActionBarReadUnread {...props} />);
}

test('with note status read, renders an a with message to mark as unread', () => {
  const component = shallowRender();
  expect(component).toBeA('A');
  expect(component.find('FormattedMessage')).toHaveProps({ ...messages.markAsUnread });
});

test('with note status read, clicking link calls `updateNoteStatus` with `unread` argument', () => {
  const updateNoteStatus = createSpy();
  const props = {
    note: Map({ status: 'read' }),
    updateNoteStatus,
  };
  const preventDefaultSpy = createSpy();
  const component = shallowRender(props);
  component.simulate('click', { preventDefault: preventDefaultSpy });
  expect(preventDefaultSpy).toHaveBeenCalled();
  expect(updateNoteStatus).toHaveBeenCalledWith('unread');
});

test('with note status unread, renders an a with message to mark as read', () => {
  const props = {
    note: Map({ status: 'unread' }),
    updateNoteStatus: noop,
  };
  const component = shallowRender(props);
  expect(component).toBeA('A');
  expect(component.find('FormattedMessage')).toHaveProps({ ...messages.markAsRead });
});

test('with note status unread, clicking link calls `updateNoteStatus` with `read` argument', () => {
  const updateNoteStatus = createSpy();
  const props = {
    note: Map({ status: 'unread' }),
    updateNoteStatus,
  };
  const preventDefaultSpy = createSpy();
  const component = shallowRender(props);
  component.simulate('click', { preventDefault: preventDefaultSpy });
  expect(preventDefaultSpy).toHaveBeenCalled();
  expect(updateNoteStatus).toHaveBeenCalledWith('read');
});
