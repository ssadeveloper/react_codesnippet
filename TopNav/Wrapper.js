import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultTheme from 'style/theme';
import dimensions from 'style/dimensions';
import px2rem from 'utils/px2rem';

// Top nav wrapper
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  padding: ${px2rem(22)} ${px2rem(20)};
  height: ${dimensions.topNavHeight};
  background-color: #fff;
  border-bottom: 6px solid ${props => props.theme.colors.brightBlue};
  overflow: visible;
  z-index: 10;
`;

Wrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      brightBlue: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Wrapper.defaultProps = {
  theme: defaultTheme,
};

export default Wrapper;
