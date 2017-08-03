import React from 'react';

import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';

import NotesOptionsBar from '../index';

const defaultNotesOptions = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

function onChangeNoteOption() {
  return true;
}

const notesOptionsPlaceholder = 'placeholder';

const selectedNoteOption = defaultNotesOptions[0];

const composerVisible = true;

function handleClickNewNote() {
  return false;
}

const defaultProps = {
  notesOptions: defaultNotesOptions,
  notesOptionsPlaceholder,
  onChangeNoteOption,
  selectedNoteOption,
  composerVisible,
  handleClickNewNote,
};

function shallowRender(props = defaultProps) {
  return shallow(<NotesOptionsBar {...props} />);
}

test('renders a WidgetOptionsBar', () => {
  expect(shallowRender()).toBeA('WidgetOptionsBar');
});

test('renders a DropDownSelector', () => {
  const component = shallowRender();
  expect(component).toContain('DropDownSelector');
});

test('DropDownSelector receives correct props', () => {
  const component = shallowRender();
  expect(component.find('DropDownSelector')).toHaveProps({
    onChange: onChangeNoteOption,
    options: defaultNotesOptions,
    selected: selectedNoteOption,
  });
});

test('renders a NoteCreatorButton', () => {
  const component = shallowRender();
  expect(component).toContain('NoteCreatorButton');
});

test('NoteCreatorButton receives correct props', () => {
  const component = shallowRender();
  expect(component.find('NoteCreatorButton')).toHaveProps({
    onClick: handleClickNewNote,
  });
});
