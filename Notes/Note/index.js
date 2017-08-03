import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import { noop } from 'lodash';

import Expandable, { ExpandableContent, ExpandableHeader } from 'containers/Expandable';

import StatusIndicator from 'components/_common/StatusIndicator';

import Gravatar from 'elements/Gravatar';
import {
  SplitBlock,
  SplitBlockElement,
  SplitBlockPart,
} from 'elements/SplitBlock';

import { userTimeZone } from 'utils/timeUtils';

import messages from './messages';

import NoteActionBar from './NoteActionBar';
import NoteBlock from './NoteBlock';
import NoteBody from './NoteBody';
import NoteRecipient from './NoteRecipient';
import NoteSender from './NoteSender';
import NoteSentAt from './NoteSentAt';
import NoteTitleBar from './NoteTitleBar';

export function buildUserLabel(user, group) {
  const fullName = user && `${user.get('firstName')} ${user.get('lastName')} `;
  const companyName = group.get('companyName');
  return `${fullName || ''}${companyName ? `(${companyName})` : ''}`;
}

export function buildSentAt(note) {
  return moment.tz(note.get('sentAt'), userTimeZone());
}

export function buildRecipientText(note) {
  const recipients = note.get('recipients');
  const recipientNames = recipients.map(r => buildUserLabel(r.get('user'), r.get('group')));
  return recipientNames.join(' ');
}

class Note extends Component {
  static propTypes = {
    handleClickReply: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool,
    note: ImmutablePropTypes.map.isRequired,
    onExpand: PropTypes.func,
    updateNoteStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isExpanded: true,
    onExpand: noop,
  };

  handleMouseEnter = () => {
    const { note, updateNoteStatus } = this.props;
    if (note.get('status') === 'read') return;

    // It's better to save the timeout handler as an instance variable than
    // storing it as a state because in the latter case, `render()` will be
    // unnecessarily called whenever this happens.
    // Refer to: http://stackoverflow.com/a/25208809/3930247
    this.hoverTimeout = setTimeout(() => {
      updateNoteStatus('read');
    }, 3000);
  }

  handleMouseLeave = () => {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  handleClickReply = () => {
    const { note, handleClickReply } = this.props;
    const replyUsers = note.get('recipients').insert(0, note.get('sender'));
    handleClickReply(replyUsers);
  }

  render() {
    const { note, updateNoteStatus, isExpanded, onExpand } = this.props;
    const senderUser = note.getIn(['sender', 'user']) || Map();
    const senderGroup = note.getIn(['sender', 'group']) || Map();

    return (
      <NoteBlock
        key={note.get('id')}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Expandable
          hasPopover
          popoverMessages={messages}
          isExpanded={isExpanded}
          onExpand={onExpand}
          expandKey={`noteExpanded-${note.get('id')}`}
        >
          <ExpandableHeader>
            <NoteTitleBar>
              <SplitBlock>
                <SplitBlockPart modifiers={['left', 'wide']}>
                  <SplitBlockElement type="padRight">
                    <Gravatar email={senderUser.get('email')} round />
                  </SplitBlockElement>
                  <SplitBlockElement type="padRight">
                    <NoteSender>{buildUserLabel(senderUser, senderGroup)}</NoteSender>
                  </SplitBlockElement>
                  <SplitBlockElement type="padRight">
                    <StatusIndicator item={note} />
                  </SplitBlockElement>
                </SplitBlockPart>
                <SplitBlockPart modifiers={['right']}>
                  <NoteSentAt>
                    <FormattedRelative value={buildSentAt(note)} />
                  </NoteSentAt>
                </SplitBlockPart>
              </SplitBlock>
            </NoteTitleBar>
          </ExpandableHeader>
          <ExpandableContent>
            <NoteBody>
              <NoteRecipient>{buildRecipientText(note)}</NoteRecipient>
              <div>{note.get('message')}</div>
            </NoteBody>
            <NoteActionBar
              handleClickReply={this.handleClickReply}
              note={note}
              updateNoteStatus={updateNoteStatus}
            />
          </ExpandableContent>
        </Expandable>
      </NoteBlock>
    );
  }
}

export default Note;
