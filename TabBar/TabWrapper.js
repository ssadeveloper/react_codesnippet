import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from 'style/theme';
import dimensions from 'style/dimensions';

export function activeStyle({ active, theme }) {
  if (active) {
    return `
      background-color: ${theme.colors.cardBackground};
      font-weight: bold;
    `;
  }
  return `
    background-color: transparent;
    border-bottom: 1px solid ${theme.colors.cardHeaderLine};
  `;
}

/* istanbul ignore next */
const TabWrapper = styled.div`
  ${activeStyle}
  border-left: 1px solid ${props => props.theme.colors.cardHeaderLine};
  border-top: 1px solid ${props => props.theme.colors.cardHeaderLine};
  max-width: ${dimensions.tabWidth};
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

TabWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      cardBackground: PropTypes.string.isRequired,
      cardHeaderLine: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  active: PropTypes.bool,
};

TabWrapper.defaultProps = {
  theme: defaultTheme,
  active: false,
};

export default TabWrapper;
