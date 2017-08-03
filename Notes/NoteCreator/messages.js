import { defineMessages } from 'react-intl';

const messages = defineMessages({
  loadingRecipientsError: {
    id: 'components.Notes.NoteCreator.error.loadingRecipientsErrorDescription',
    defaultMessage: 'Sorry, we had a connection issue while loading recipients. Please try again.',
  },
  newNote: {
    id: 'components.Notes.NoteCreator.NoteCreatorButton.text',
    defaultMessage: 'New Note',
  },
  noRecipientsError: {
    id: 'components.Notes.NoteCreator.error.noRecipientsErrorDescription',
    defaultMessage: 'We didn\'t find any possible recipients. Please contact our support services team.',
  },
});

export default messages;
