import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import { getOutputText } from 'utils/widget';

import { CardElement } from 'elements/Card';
import Popover, {
  PopoverTarget,
  PopoverContent,
  ScrollingPopoverContentWrapper,
} from 'elements/Popover';

import TextDiv from 'elements/TextDiv';

import messages from './messages';

function Complaint({ caseInfo }) {
  // TODO: This logic could almost certainly be extracted to a utils function and shared between
  // here and the complaint widget.
  const complaintCode = caseInfo.getIn(['complaint', 'code']);
  const complaintDescription = caseInfo.getIn(['complaint', 'description']);
  const subtitle = complaintCode && complaintDescription
    ? `${complaintCode} - ${complaintDescription}`
    : '';
  const caseDescription = caseInfo.get('description');

  return (
    <CardElement>
      <Popover showOnHover>
        <PopoverTarget>
          <TextDiv modifiers={['bold', 'bottomGap', 'smallText']}>
            <FormattedMessage {...messages.complaintTitle} />
          </TextDiv>
          <TextDiv modifiers={['bottomGap', 'heavyText', 'ellipsis', 'oneLine', 'smallText']}>
            {getOutputText(subtitle, messages.undefinedComplaintSubTitle)}
          </TextDiv>
          <TextDiv modifiers={['ellipsis', 'midGreyText', 'short', 'smallText']}>
            {getOutputText(caseDescription, messages.undefinedComplaint)}
          </TextDiv>
        </PopoverTarget>
        <PopoverContent>
          <ScrollingPopoverContentWrapper modifiers={['smallText']}>
            <TextDiv modifiers={['bold', 'bright', 'bottomGap']}>
              {getOutputText(subtitle, messages.undefinedComplaintSubTitle)}
            </TextDiv>
            <TextDiv modifiers={['bottomGap']}>
              {getOutputText(caseDescription, messages.undefinedComplaint)}
            </TextDiv>
          </ScrollingPopoverContentWrapper>
        </PopoverContent>
      </Popover>
    </CardElement>
  );
}

Complaint.propTypes = {
  caseInfo: ImmutablePropTypes.contains({
    complaint: PropTypes.shape({
      code: PropTypes.string,
      description: PropTypes.string,
    }),
    description: PropTypes.string,
  }).isRequired,
};

export default Complaint;
