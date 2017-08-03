import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from 'style/theme';
import px2rem from 'utils/px2rem';

export function borderLeft({ hasTab }) {
  if (hasTab) {
    return null;
  }
  return `
    border-left: none;
  `;
}

const OtherWrapper = styled.div`
  padding-left: ${px2rem(7)};
  padding-right: ${px2rem(7)};
  border: 1px solid ${props => props.theme.colors.cardHeaderLine};
  ${borderLeft}
  display: flex;
  flex: 1;
  align-items: center;
`;

OtherWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      cardHeaderLine: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  hasTab: PropTypes.bool,
};

OtherWrapper.defaultProps = {
  theme: defaultTheme,
  hasTab: true,
};

export default OtherWrapper;
