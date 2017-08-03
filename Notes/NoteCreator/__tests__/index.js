import React from 'react';
import { Map } from 'immutable';

import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';

import {
  COMPOSER_ERROR,
  COMPOSER_HIDDEN,
  COMPOSER_INVISIBLE,
  COMPOSER_LOADING,
  COMPOSER_NO_RECIPIENTS,
  COMPOSER_VISIBLE,
} from '../../constants';
import messages from '../messages';
import NoteCreator from '../index';

const caseRecipients = Map();
const focusTextArea = () => true;
const handleChangeRecipient = () => true;
const handleClickCancel = () => true;
const handleClickNewNote = () => true;
const handleClickPostNote = () => true;
const selectedRecipients = [
  {
    label: 'test user name',
    value: {},
  },
];

const testProps = {
  caseRecipients,
  composerStatus: COMPOSER_INVISIBLE,
  focusTextArea,
  handleChangeRecipient,
  handleClickCancel,
  handleClickNewNote,
  handleClickPostNote,
  selectedRecipients,
};

function shallowRenderer(props = testProps) {
  return (shallow(<NoteCreator {...props} />));
}

test('renders a NoteComposer with correct props if composerStatus is COMPOSER_VISIBLE', () => {
  const props = {
    ...testProps,
    composerStatus: COMPOSER_VISIBLE,
  };
  const component = shallowRenderer(props);
  expect(component).toContain('NoteComposer');
  expect(component.find('NoteComposer')).toHaveProps({
    caseRecipients,
    focusTextArea,
    handleChangeRecipient,
    handleClickCancel,
    handleClickPostNote,
    selectedRecipients,
  });
});

test('renders a NoteCreatorButton if composerStatus is COMPOSER_INVISIBLE', () => {
  const component = shallowRenderer();
  expect(component).toContain('NoteCreatorButton');
  expect(component.find('NoteCreatorButton')).toHaveProps({
    onClick: handleClickNewNote,
  });
});

test('does not render the NoteComposer if composerStatus is COMPOSER_HIDDEN', () => {
  const props = {
    ...testProps,
    composerStatus: COMPOSER_HIDDEN,
  };
  const component = shallowRenderer(props);
  expect(component).toContain('NoteCreatorButton');
  expect(component).toNotContain('NoteComposer');
});

test('renders a NoteCreatorButton if composerStatus is COMPOSER_LOADING', () => {
  const props = {
    ...testProps,
    composerStatus: COMPOSER_LOADING,
  };
  const component = shallowRenderer(props);
  expect(component).toContain('NoteCreatorButton');
});

test('renders a NoteCreatorError block with correct error message if composerStatus is COMPOSER_ERROR', () => {
  const props = {
    ...testProps,
    composerStatus: COMPOSER_ERROR,
  };
  const component = shallowRenderer(props);
  expect(component).toContain('NoteCreatorButton');
  expect(component).toContain('NoteCreatorError');
  expect(component.find('NoteCreatorError FormattedMessage')).toHaveProps({
    ...messages.loadingRecipientsError,
  });
});

test('renders a NoteCreatorError block with correct error message if composerStatus is COMPOSER_NO_RECIPIENTS', () => {
  const props = {
    ...testProps,
    composerStatus: COMPOSER_NO_RECIPIENTS,
  };
  const component = shallowRenderer(props);
  expect(component).toContain('NoteCreatorButton');
  expect(component).toContain('NoteCreatorError');
  expect(component.find('NoteCreatorError FormattedMessage')).toHaveProps({
    ...messages.noRecipientsError,
  });
});
