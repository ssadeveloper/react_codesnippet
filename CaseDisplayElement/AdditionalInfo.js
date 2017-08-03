import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import UnreadNotesLabel from 'components/_common/UnreadNotesLabel';
import FollowUpLabel from 'components/_common/FollowUpLabel';

import { CardElement } from 'elements/Card';
import { SplitBlock, SplitBlockElement, SplitBlockPart } from 'elements/SplitBlock';

function AdditionalInfo({ caseInfo }) {
  return (
    <CardElement>
      <SplitBlock pad="none">
        <SplitBlockPart modifiers={['left', 'wide']}>
          <SplitBlockElement type="padRight">
            <UnreadNotesLabel caseInfo={caseInfo} />
          </SplitBlockElement>
          <SplitBlockElement>
            <FollowUpLabel caseInfo={caseInfo} />
          </SplitBlockElement>
        </SplitBlockPart>
      </SplitBlock>
    </CardElement>
  );
}

AdditionalInfo.propTypes = {
  caseInfo: ImmutablePropTypes.map.isRequired,
};

export default AdditionalInfo;
