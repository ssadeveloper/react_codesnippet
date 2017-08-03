import React from 'react';

import SearchContainer from 'containers/SearchContainer';

import VerticalDivider from 'elements/VerticalDivider';

import Wrapper from './Wrapper';
import AddNew from '../AddNew';
import Notifications from '../Notifications';
import UserProfile from '../UserProfile';

function Controls() {
  return (
    <Wrapper>
      <SearchContainer />
      <AddNew />
      <VerticalDivider />
      <Notifications />
      <UserProfile />
    </Wrapper>
  );
}

export default Controls;
