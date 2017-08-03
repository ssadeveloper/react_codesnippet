import React from 'react';
import FontAwesome from 'react-fontawesome';

import CircleButton from 'elements/CircleButton';

/* TODO: Needs to add notifications UI & functionality implementation */

function Notifications() {
  return (
    <CircleButton>
      <FontAwesome name="bell-o" />
    </CircleButton>
  );
}

export default Notifications;
