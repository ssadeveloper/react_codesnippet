import React from 'react';
import { Map } from 'immutable';

import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';

import NoteActionBar from '../index';

const defaultProps = {
  handleClickReply: () => true,
  note: Map({ status: 'read' }),
  updateNoteStatus: () => true,
};

function shallowRender(props = defaultProps) {
  return shallow(<NoteActionBar {...props} />);
}

test('renders a NoteActionBarReply component with correct props', () => {
  const component = shallowRender();
  const { handleClickReply } = defaultProps;
  expect(component).toContain('NoteActionBarReply');
  expect(component.find('NoteActionBarReply')).toHaveProps({ handleClickReply });
});

test('renders a NoteActionBarReadUnread component with correct props', () => {
  const component = shallowRender();
  const { note, updateNoteStatus } = defaultProps;
  expect(component).toContain('NoteActionBarReadUnread');
  expect(component.find('NoteActionBarReadUnread')).toHaveProps({ note, updateNoteStatus });
});
