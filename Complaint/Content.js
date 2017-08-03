import PropTypes from 'prop-types';
import styled from 'styled-components';

import px2rem from 'utils/px2rem';
import defaultTheme from 'style/theme';

const Content = styled.p`
  color: ${props => props.theme.colors.text};
  font-weight: normal;
  font-size: ${px2rem(12)};
  line-height: ${px2rem(19)};
  margin: 0;
  padding-top: ${px2rem(8)};
  padding-left: ${px2rem(20)};
`;

Content.propTypes = {
  theme: PropTypes.shape(),
};

Content.defaultProps = {
  theme: defaultTheme,
};

export default Content;
