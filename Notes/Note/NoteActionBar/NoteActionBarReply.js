import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import A from 'elements/A';

import messages from './messages';

function NoteActionBarReply({ handleClickReply }) {
  return (
    <A
      href=""
      onClick={(e) => {
        e.preventDefault();
        handleClickReply();
      }}
    >
      <FormattedMessage {...messages.reply} />
    </A>
  );
}

NoteActionBarReply.propTypes = {
  handleClickReply: PropTypes.func.isRequired,
};

export default NoteActionBarReply;
