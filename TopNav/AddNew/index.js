import React from 'react';
import FontAwesome from 'react-fontawesome';

import CircleButton from 'elements/CircleButton';

/* TODO: Needs to add notifications UI & functionality implementation */

function AddNew() {
  return (
    <CircleButton modifiers={['darkColor', 'normalFont']}>
      <FontAwesome name="plus" />
    </CircleButton>
  );
}

export default AddNew;
