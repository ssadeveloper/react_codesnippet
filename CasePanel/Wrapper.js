import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultTheme from 'style/theme';

const Wrapper = styled.section`
  flex-grow: 1;
  background: ${props => props.theme.colors.cardBackground};
`;

Wrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      cardBackground: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Wrapper.defaultProps = {
  theme: defaultTheme,
};

export default Wrapper;
