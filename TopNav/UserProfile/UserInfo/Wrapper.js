import PropTypes from 'prop-types';
import styled from 'styled-components';

import dimensions from 'style/dimensions';
import defaultTheme from 'style/theme';

export function wrapperColor({ theme, expanded }) {
  if (expanded) {
    return theme.colors.brightBlue;
  }

  return theme.colors['#999999'];
}

const Wrapper = styled.div`
  color: ${props => wrapperColor(props)};

  .fa-caret-down {
    font-size: ${dimensions.fontSizeMedium};
  }

  &:hover {
    color: ${props => props.theme.colors.brightBlue};
    span:not(.fa) {
      text-decoration: underline;
    }
  }
`;

Wrapper.propTypes = {
  expanded: PropTypes.bool,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      brightBlue: PropTypes.string.isRequired,
      '#999999': PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Wrapper.defaultProps = {
  expanded: false,
  theme: defaultTheme,
};

export default Wrapper;
