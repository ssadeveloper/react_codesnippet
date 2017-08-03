import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import {
  SplitBlock,
  SplitBlockPart,
} from 'elements/SplitBlock';

import NoteActionBarWrapper from './NoteActionBarWrapper';
import NoteActionBarReadUnread from './NoteActionBarReadUnread';
import NoteActionBarReply from './NoteActionBarReply';

function NoteActionBar({ handleClickReply, note, updateNoteStatus }) {
  return (
    <NoteActionBarWrapper>
      <SplitBlock>
        <SplitBlockPart modifiers={['left']}>
          <NoteActionBarReply handleClickReply={handleClickReply} />
        </SplitBlockPart>
        <SplitBlockPart modifiers={['right']}>
          <NoteActionBarReadUnread note={note} updateNoteStatus={updateNoteStatus} />
        </SplitBlockPart>
      </SplitBlock>
    </NoteActionBarWrapper>
  );
}

NoteActionBar.propTypes = {
  handleClickReply: PropTypes.func.isRequired,
  note: ImmutablePropTypes.map.isRequired,
  updateNoteStatus: PropTypes.func.isRequired,
};

export default NoteActionBar;
