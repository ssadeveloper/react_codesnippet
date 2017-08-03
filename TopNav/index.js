import React from 'react';

// FIXME: Remove this. This was added for demo purpose
// import GhostIndicator from 'components/_common/GhostIndicator';

import Wrapper from './Wrapper';
import Logo from './Logo';
import Controls from './Controls';

function TopNav() {
  return (
    <Wrapper id="top-nav">
      {/* FIXME: Remove this. This was added for demo purpose */}
      {/* <GhostIndicator style={{ width: 300 }} /> */}
      <Logo />
      <Controls />
    </Wrapper>
  );
}

export default TopNav;
