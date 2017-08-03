import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'elements/Img';

import px2rem from 'utils/px2rem';

const LogoImg = styled(Img)`
  width: auto;
  height: ${px2rem(34)};
`;

Img.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  alt: PropTypes.string,
};

Img.defaultProps = {
  alt: 'Logo',
};

export default LogoImg;
