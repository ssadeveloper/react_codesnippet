import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultTheme from 'style/theme';

import px2rem from 'utils/px2rem';

/* istanbul ignore next */
const NoteBlock = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.background};
  font-size: ${px2rem(12)};
`;

NoteBlock.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

NoteBlock.defaultProps = {
  theme: defaultTheme,
};

export default NoteBlock;
