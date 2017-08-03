import PropTypes from 'prop-types';
import styled from 'styled-components';

import px2rem from 'utils/px2rem';
import defaultTheme from 'style/theme';

const Title = styled.p`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  font-size: ${px2rem(14)};
  height: ${px2rem(19)};
  line-height: ${px2rem(19)};
  margin: 0;
  padding-left: ${px2rem(20)};
`;

Title.propTypes = {
  theme: PropTypes.shape(),
};

Title.defaultProps = {
  theme: defaultTheme,
};

export default Title;
