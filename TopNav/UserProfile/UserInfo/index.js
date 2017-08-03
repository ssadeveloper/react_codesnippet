import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import FontAwesome from 'react-fontawesome';
import { filter } from 'lodash';

import Wrapper from './Wrapper';
import UserAvatar from './UserAvatar';
import UserInfoLabelWrapper from './UserInfoLabelWrapper';
import UserInfoLabel from './UserInfoLabel';
import GhostUserAvatar from './GhostUserAvatar';
import GhostUserInfo from './GhostUserInfo';

function UserInfo({ userProfile, expanded }) {
  const fullName = filter([
    userProfile.get('firstName'),
    userProfile.get('lastName'),
  ]).join(' ');
  const title = userProfile.get('jobTitle') || userProfile.get('companyName');
  const email = userProfile.get('email');

  return (
    <Wrapper expanded={expanded}>
      {email ? <UserAvatar email={email} /> : <GhostUserAvatar />}
      {fullName || title ?
        <UserInfoLabelWrapper>
          <UserInfoLabel>{fullName}</UserInfoLabel>
          <UserInfoLabel bold>{title}</UserInfoLabel>
        </UserInfoLabelWrapper>
        :
        <UserInfoLabelWrapper>
          <GhostUserInfo />
        </UserInfoLabelWrapper>
      }
      <FontAwesome name="caret-down" />
    </Wrapper>
  );
}

UserInfo.propTypes = {
  expanded: PropTypes.bool.isRequired,
  userProfile: ImmutablePropTypes.contains({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    jobTitle: PropTypes.string,
    companyName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

UserInfo.defaultProps = {
  expanded: false,
  userProfile: Map(),
};

export default UserInfo;
