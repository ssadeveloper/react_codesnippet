import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import {
  COMPOSER_ERROR,
  COMPOSER_HIDDEN,
  COMPOSER_INVISIBLE,
  COMPOSER_LOADING,
  COMPOSER_NO_RECIPIENTS,
  COMPOSER_VISIBLE,
} from '../constants';

import messages from './messages';
import NoteCreatorBlock from './NoteCreatorBlock';
import NoteCreatorButton from './NoteCreatorButton';
import NoteComposer from './NoteComposer';
import NoteCreatorError from './NoteCreatorError';

function NoteCreator({
  caseRecipients,
  composerStatus,
  focusTextArea,
  handleChangeRecipient,
  handleClickCancel,
  handleClickNewNote,
  handleClickPostNote,
  selectedRecipients,
}) {
  return (
    <NoteCreatorBlock>
      {
        composerStatus === COMPOSER_VISIBLE ?
          <NoteComposer
            caseRecipients={caseRecipients}
            focusTextArea={focusTextArea}
            handleChangeRecipient={handleChangeRecipient}
            handleClickCancel={handleClickCancel}
            handleClickPostNote={handleClickPostNote}
            selectedRecipients={selectedRecipients}
          />
        :
          <div>
            <NoteCreatorButton withText onClick={handleClickNewNote} />
            { composerStatus === COMPOSER_ERROR &&
              <NoteCreatorError>
                <FormattedMessage {...messages.loadingRecipientsError} />
              </NoteCreatorError>
            }
            { composerStatus === COMPOSER_NO_RECIPIENTS &&
              <NoteCreatorError>
                <FormattedMessage {...messages.noRecipientsError} />
              </NoteCreatorError>
            }
          </div>
      }
    </NoteCreatorBlock>
  );
}

NoteCreator.propTypes = {
  caseRecipients: ImmutablePropTypes.map,
  composerStatus: PropTypes.oneOf([
    COMPOSER_ERROR,
    COMPOSER_HIDDEN,
    COMPOSER_INVISIBLE,
    COMPOSER_LOADING,
    COMPOSER_NO_RECIPIENTS,
    COMPOSER_VISIBLE,
  ]),
  focusTextArea: PropTypes.func,
  handleChangeRecipient: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
  handleClickNewNote: PropTypes.func.isRequired,
  handleClickPostNote: PropTypes.func.isRequired,
  selectedRecipients: PropTypes.arrayOf(PropTypes.object),
};

NoteCreator.defaultProps = {
  caseRecipients: Map(),
  composerStatus: COMPOSER_INVISIBLE,
  focusTextArea: noop,
  selectedRecipients: [],
};

export default NoteCreator;
export NoteCreatorButton from './NoteCreatorButton';
