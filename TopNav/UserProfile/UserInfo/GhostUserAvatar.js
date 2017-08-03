import styled from 'styled-components';

import px2rem from 'utils/px2rem';
import dimensions from 'style/dimensions';

import GhostIndicator from 'components/_common/GhostIndicator';

const AVATAR_SIZE_PX = 34;

const GhostUserAvatar = styled(GhostIndicator)`
  border-radius: ${px2rem(AVATAR_SIZE_PX / 2)};
  width: ${px2rem(AVATAR_SIZE_PX)};
  height: ${px2rem(AVATAR_SIZE_PX)};
  margin: 0 ${dimensions.spacingNormal} 0 0;
  vertical-align: middle;
`;

export default GhostUserAvatar;
