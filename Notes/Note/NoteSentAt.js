import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultTheme from 'style/theme';

/* istanbul ignore next */
const NoteSentAt = styled.div`
  align-self: center;
  color: ${props => props.theme.colors['#666666']};
`;

NoteSentAt.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      '#666666': PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

NoteSentAt.defaultProps = {
  theme: defaultTheme,
};

export default NoteSentAt;
