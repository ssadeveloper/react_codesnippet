import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultTheme from 'style/theme';
import px2rem from 'utils/px2rem';
import { styleModifier, modifierArrayPropType } from 'utils/styles';

const MODIFIER_CONFIG = {
  block: () => ({ styles: 'display: block' }),
};

const NoteComposerLabel = styled.span`
  ${styleModifier(MODIFIER_CONFIG)}
  color: ${props => props.theme.colors['#666666']};
  font-size: ${px2rem(12)};
  line-height: ${px2rem(15)};
  text-transform: uppercase;
`;

NoteComposerLabel.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      '#666666': PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  modifiers: modifierArrayPropType(MODIFIER_CONFIG),
};

NoteComposerLabel.defaultProps = {
  theme: defaultTheme,
};

export default NoteComposerLabel;
