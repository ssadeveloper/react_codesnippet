import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from 'utils/px2rem';
import defaultTheme from 'style/theme';

const NoTabsWrapper = styled.div`
  font-style: italic;
  line-height: ${px2rem(34)};
  border: 1px solid ${props => props.theme.colors.cardHeaderLine};
  border-right: none;
  padding-left: ${px2rem(10)};
`;

NoTabsWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      cardHeaderLine: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

NoTabsWrapper.defaultProps = {
  theme: defaultTheme,
};

export default NoTabsWrapper;
