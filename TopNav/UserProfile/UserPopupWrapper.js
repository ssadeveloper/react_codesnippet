import PropTypes from 'prop-types';
import styled from 'styled-components';

import px2rem from 'utils/px2rem';
import dimensions from 'style/dimensions';
import defaultTheme from 'style/theme';

/* istanbul ignore next */
const UserPopupWrapper = styled.div`
  width: ${px2rem(215)};
  height: auto;
  margin: ${px2rem(10)};
  padding: ${px2rem(10)};
  background: #fff;
  box-shadow: 0 ${px2rem(3)} ${px2rem(7)} 0 ${props => props.theme.colors.shadowGray};
  cursor: auto;
  overflow: hidden;
  text-align: right;
  box-sizing: border-box;

  .menu-item {
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      color: ${props => props.theme.colors['#666666']};
      font-size: ${dimensions.fontSizeNormal};
    }
  }
`;

UserPopupWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      shadowGray: PropTypes.string.isRequired,
      '#666666': PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

UserPopupWrapper.defaultProps = {
  theme: defaultTheme,
};

export default UserPopupWrapper;
