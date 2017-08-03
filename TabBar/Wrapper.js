import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from 'style/theme';
import px2rem from 'utils/px2rem';

const Wrapper = styled.section`
  flex-grow: 1;
  background-color: ${props => props.theme.colors['#f7f7f7']};
  height: ${px2rem(34)};
  font-size: ${px2rem(12)};
  color: ${props => props.theme.colors['#666666']};
  display: flex;
`;

Wrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      '#f7f7f7': PropTypes.string.isRequired,
      '#666666': PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Wrapper.defaultProps = {
  theme: defaultTheme,
};

export default Wrapper;
