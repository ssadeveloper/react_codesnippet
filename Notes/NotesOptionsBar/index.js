import React from 'react';
import PropTypes from 'prop-types';

import DropDownSelector from 'components/_common/DropDownSelector';

import {
  SplitBlock,
  SplitBlockPart,
} from 'elements/SplitBlock';
import { WidgetOptionsBar } from 'elements/Widget';

import { NoteCreatorButton } from '../NoteCreator';

function NotesOptionsBar({
  notesOptions,
  notesOptionsPlaceholder,
  onChangeNoteOption,
  selectedNoteOption,
  handleClickNewNote,
}) {
  return (
    <WidgetOptionsBar>
      <SplitBlock>
        <SplitBlockPart modifiers={['left', 'wide']}>
          <DropDownSelector
            onChange={onChangeNoteOption}
            options={notesOptions}
            placeholder={notesOptionsPlaceholder}
            selected={selectedNoteOption}
          />
        </SplitBlockPart>
        <SplitBlockPart modifiers={['right']}>
          <NoteCreatorButton onClick={handleClickNewNote} />
        </SplitBlockPart>
      </SplitBlock>
    </WidgetOptionsBar>
  );
}

NotesOptionsBar.propTypes = {
  notesOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  notesOptionsPlaceholder: PropTypes.string.isRequired,
  onChangeNoteOption: PropTypes.func.isRequired,
  selectedNoteOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  handleClickNewNote: PropTypes.func.isRequired,
};

NotesOptionsBar.defaultProps = {
  selectedNoteOption: undefined,
};

export default NotesOptionsBar;
