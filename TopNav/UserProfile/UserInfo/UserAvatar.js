import styled from 'styled-components';

import px2rem from 'utils/px2rem';
import dimensions from 'style/dimensions';

import Gravatar from 'elements/Gravatar';

const AVATAR_SIZE_PX = 34;

const UserAvatar = styled(Gravatar)`
  img {
    border-radius: ${px2rem(AVATAR_SIZE_PX / 2)};
    width: ${px2rem(AVATAR_SIZE_PX)};
    height: ${px2rem(AVATAR_SIZE_PX)};
    margin-right: ${dimensions.spacingNormal};
    vertical-align: middle;
  }
`;

export default UserAvatar;
