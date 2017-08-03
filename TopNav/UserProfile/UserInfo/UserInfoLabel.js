import PropTypes from 'prop-types';
import styled from 'styled-components';

import dimensions from 'style/dimensions';
import px2rem from 'utils/px2rem';

const UserInfoLabel = styled.span`
  display: block;
  font-size: ${dimensions.fontSizeNormal};
  font-weight: ${props => (props.bold ? '500' : '300')};
  line-height: ${px2rem(17)};
`;

UserInfoLabel.propTypes = {
  bold: PropTypes.bool,
};

UserInfoLabel.defaultProps = {
  bold: false,
};

export default UserInfoLabel;
