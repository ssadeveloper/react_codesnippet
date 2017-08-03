import styled from 'styled-components';

import px2rem from 'utils/px2rem';

import GhostIndicator from 'components/_common/GhostIndicator';

const GhostUserInfo = styled(GhostIndicator)`
  width: ${px2rem(75)};
  height: ${px2rem(17)};
`;

export default GhostUserInfo;
