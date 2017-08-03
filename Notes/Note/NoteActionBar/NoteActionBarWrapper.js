import styled from 'styled-components';
import PropTypes from 'prop-types';

import defaultTheme from 'style/theme';

import px2rem from 'utils/px2rem';

/* istanbul ignore next */
const NoteActionBarWrapper = styled.div`
  font-size: ${px2rem(10)};
  margin-bottom: ${px2rem(8)};
  margin-left: ${px2rem(54)};
  a {
    color: ${props => props.theme.colors.active};
    &:hover {
      color: ${props => props.theme.colors.brandBright};
    }
  }
`;

NoteActionBarWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      active: PropTypes.string.isRequired,
      brandBright: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

NoteActionBarWrapper.defaultProps = {
  theme: defaultTheme,
};

export default NoteActionBarWrapper;
