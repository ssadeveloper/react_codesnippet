import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { compact } from 'lodash';

import RectangleButton, {
  RectangleButtonIcon,
  RectangleButtonText,
} from 'elements/RectangleButton';

import messages from './messages';

function NoteCreatorButton({ onClick, withText }) {
  const wide = withText && 'wide';

  return (
    <RectangleButton
      modifiers={compact([
        'hoverBrandBright',
        'hoverShadow',
        'hoverUnderline',
        'pureWhite',
        wide,
      ])}
      onClick={onClick}
    >
      <RectangleButtonIcon>
        <FontAwesome name="plus" />
      </RectangleButtonIcon>
      {withText &&
        <RectangleButtonText modifiers={['small', 'padLeft', 'uppercase']}>
          <FormattedMessage {...messages.newNote} />
        </RectangleButtonText>}
    </RectangleButton>
  );
}

NoteCreatorButton.propTypes = {
  withText: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

NoteCreatorButton.defaultProps = {
  withText: false,
};

export default NoteCreatorButton;
