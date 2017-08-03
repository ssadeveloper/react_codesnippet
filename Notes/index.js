import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { List, Map } from 'immutable';
import { noop } from 'lodash';
import { scroller, Element } from 'react-scroll';

import {
  WidgetWrapper,
  Widget,
  WidgetHeader,
  WidgetItem,
} from 'elements/Widget';

import {
  COMPOSER_ERROR,
  COMPOSER_HIDDEN,
  COMPOSER_INVISIBLE,
  COMPOSER_NO_RECIPIENTS,
  COMPOSER_VISIBLE,
  SCROLLABLE_COMPOSER_NAME,
} from './constants';

import messages from './messages';
import Note from './Note';
import NoteCreator from './NoteCreator';
import NotesOptionsBar from './NotesOptionsBar';
import { recipientToOption, selectedRecipientsforApi } from './utils';

export function buildSelectedRecipientOptions(recipients) {
  return recipients.map(recipient => ({
    ...recipientToOption(recipient),
    isInTree: true,
  })).toJS();
}

class Notes extends Component {
  static propTypes = {
    caseInfo: ImmutablePropTypes.map,
    caseNotes: ImmutablePropTypes.list,
    caseRecipients: ImmutablePropTypes.map,
    expandStates: PropTypes.shape(),
    notesOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    loadCaseRecipients: PropTypes.func.isRequired,
    notesOptionsPlaceholder: PropTypes.string.isRequired,
    onExpandNote: PropTypes.func,
    onChangeNoteOption: PropTypes.func.isRequired,
    selectedNoteOption: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    postCaseNote: PropTypes.func.isRequired,
    updateNoteStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    caseInfo: Map(),
    caseNotes: List(),
    caseRecipients: Map(),
    expandStates: {},
    onExpandNote: noop,
    selectedNoteOption: undefined,
  };

  state = {
    composerStatus: COMPOSER_INVISIBLE,
    selectedRecipients: [],
    shouldFocusTextArea: false,
  };

  componentWillReceiveProps = (nextProps) => {
    const { caseRecipients } = nextProps;
    const recipientsChanging = caseRecipients !== this.props.caseRecipients;
    const requestInProgress = caseRecipients.get('requesting');
    if (recipientsChanging && !requestInProgress) {
      const error = caseRecipients.get('error');
      const recipientData = caseRecipients.get('data');
      if (error || !recipientData) {
        this.setState({ composerStatus: COMPOSER_ERROR });
      } else if (recipientData.size) {
        this.setState({ composerStatus: COMPOSER_VISIBLE });
      } else {
        this.setState({ composerStatus: COMPOSER_NO_RECIPIENTS });
      }
    }
  }

  focusTextArea = (textarea) => {
    if (textarea && this.state.shouldFocusTextArea) {
      textarea.focus();
      this.setState({ shouldFocusTextArea: false });
    }
  }

  handleChangeRecipient = (value) => {
    this.setState({
      selectedRecipients: value,
    });
  }

  handleClickCancel = () => {
    this.setState({ composerStatus: COMPOSER_HIDDEN });
  }

  handleClickNewNote = () => {
    const { caseInfo, loadCaseRecipients } = this.props;
    const { composerStatus } = this.state;
    this.scrollToNoteCreator();
    if (composerStatus === COMPOSER_INVISIBLE || composerStatus === COMPOSER_ERROR) {
      loadCaseRecipients(caseInfo.get('id'));
    } else if (composerStatus === COMPOSER_HIDDEN) {
      this.setState({ composerStatus: COMPOSER_VISIBLE }); // Batch state update makes this fine
    }
    this.setState({
      selectedRecipients: [],
      shouldFocusTextArea: false,
    });
  }

  handleClickPostNote = (message) => {
    const { caseInfo, postCaseNote } = this.props;
    const { selectedRecipients } = this.state;
    const recipients = selectedRecipientsforApi(selectedRecipients);
    const payload = {
      caseId: caseInfo.get('id'),
      params: {
        recipients,
        message,
      },
    };
    postCaseNote(payload);
    this.setState({
      composerStatus: COMPOSER_HIDDEN,
      selectedRecipients: [],
    });
  }

  handleClickReply = (recipients) => {
    this.handleClickNewNote();
    this.setState({
      selectedRecipients: buildSelectedRecipientOptions(recipients),
      shouldFocusTextArea: true,
    });
  }

  scrollToNoteCreator = () => {
    scroller.scrollTo(SCROLLABLE_COMPOSER_NAME, {
      duration: 500,
      smooth: true,
    });
  }

  render() {
    const {
      caseInfo,
      caseNotes,
      caseRecipients,
      expandStates,
      notesOptions,
      notesOptionsPlaceholder,
      onExpandNote,
      onChangeNoteOption,
      selectedNoteOption,
      updateNoteStatus,
    } = this.props;

    const { composerStatus, selectedRecipients } = this.state;

    const caseId = caseInfo.get('id');
    const unreadNotesCount = caseInfo.get('unreadNotesCount');
    const widgetHeaderNote = unreadNotesCount ? `(${(unreadNotesCount)} unread)` : undefined;

    return (
      <WidgetWrapper>
        <Widget id="notes" expandKey="notes">
          <WidgetHeader note={widgetHeaderNote}>
            <FormattedMessage {...messages.title} />
          </WidgetHeader>
          <WidgetItem>
            <NotesOptionsBar
              notesOptions={notesOptions}
              handleClickNewNote={this.handleClickNewNote}
              notesOptionsPlaceholder={notesOptionsPlaceholder}
              onChangeNoteOption={onChangeNoteOption}
              selectedNoteOption={selectedNoteOption}
            />
            {
              caseNotes.map((note) => {
                const noteId = note.get('id');
                return (
                  <Note
                    isExpanded={expandStates[`noteExpanded-${noteId}`]}
                    key={noteId}
                    handleClickReply={this.handleClickReply}
                    note={note}
                    onExpand={expanded => onExpandNote(noteId, expanded)}
                    updateNoteStatus={status => updateNoteStatus({ caseId, noteId, status })}
                  />
                );
              })
            }
            <Element className="react-scroll-element" name={SCROLLABLE_COMPOSER_NAME}>
              <NoteCreator
                caseRecipients={caseRecipients}
                composerStatus={composerStatus}
                handleChangeRecipient={this.handleChangeRecipient}
                handleClickCancel={this.handleClickCancel}
                handleClickNewNote={this.handleClickNewNote}
                handleClickPostNote={this.handleClickPostNote}
                selectedRecipients={selectedRecipients}
                focusTextArea={this.focusTextArea}
              />
            </Element>
          </WidgetItem>
        </Widget>
      </WidgetWrapper>
    );
  }
}

export default Notes;
