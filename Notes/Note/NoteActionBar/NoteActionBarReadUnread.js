import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import A from 'elements/A';

import messages from './messages';

function NoteActionBarReadUnread({ updateNoteStatus, note }) {
  if (note.get('status') === 'unread') {
    return (
      <A
        href=""
        onClick={(e) => {
          e.preventDefault();
          updateNoteStatus('read');
        }}
      >
        <FormattedMessage {...messages.markAsRead} />
      </A>
    );
  }
  return (
    <A
      href=""
      onClick={(e) => {
        e.preventDefault();
        updateNoteStatus('unread');
      }}
    >
      <FormattedMessage {...messages.markAsUnread} />
    </A>
  );
}

NoteActionBarReadUnread.propTypes = {
  updateNoteStatus: PropTypes.func.isRequired,
  note: ImmutablePropTypes.mapContains({
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteActionBarReadUnread;
