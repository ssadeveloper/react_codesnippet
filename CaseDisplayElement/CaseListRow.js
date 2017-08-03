import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { camelCase, compact } from 'lodash';

import ETR from 'components/_common/ETR';
import FollowUpLabel from 'components/_common/FollowUpLabel';
import SeverityLabel from 'components/SeverityLabel';
import UnreadNotesLabel from 'components/_common/UnreadNotesLabel';

import Link from 'elements/Link';
import StatusSpan from 'elements/StatusSpan';
import TextDiv from 'elements/TextDiv';
import Popover, {
  PopoverTarget,
  PopoverContent,
  ScrollingPopoverContentWrapper,
} from 'elements/Popover';

import { getOutputLink, getOutputText } from 'utils/widget';

import messages from './messages';


function CaseListRow({ caseInfo, assetInfo }) {
  const caseId = caseInfo.get('id');
  const assetUnitNumber = assetInfo.get('unitNumber');
  const providerName = caseInfo.getIn(['defaultRecipient', 'group', 'companyName']);
  const complaintCode = caseInfo.getIn(['complaint', 'code']);
  const complaintDescription = caseInfo.getIn(['complaint', 'description']);
  const complaintTitle = complaintCode && complaintDescription ? `${complaintCode} - ${complaintDescription}` : '';
  const caseDescription = caseInfo.get('description');
  const repairStatus = caseInfo.get('repairStatus');
  const estimateTotal = caseInfo.get('estimateTotal');
  const approvalStatus = caseInfo.get('approvalStatus');
  const approvalStatusModifier = approvalStatus && camelCase(approvalStatus);
  const downtime = caseInfo.get('downtime');
  const severityColor = caseInfo.get('severityColor');
  const severityCount = Number(caseInfo.get('severityCount'));

  return (
    <tr>
      <td>
        <Link to={`/cases/${caseId}`} modifiers={['heavy', 'uppercase']}>
          <FormattedMessage {...messages.title} values={{ caseId }} />
        </Link>
      </td>
      <td>
        {getOutputLink(assetUnitNumber, messages.unit)}
      </td>
      <td>
        <TextDiv maxWidth="15rem" modifiers={['ellipsis', 'short']}>
          {getOutputLink(providerName, messages.undefinedServiceProvider)}
        </TextDiv>
      </td>
      <td>
        <Popover showOnHover>
          <PopoverTarget>
            <TextDiv maxWidth="15rem" modifiers={['bottomGap', 'heavyText', 'ellipsis', 'oneLine', 'smallText']}>
              {getOutputText(complaintTitle, messages.undefinedComplaintSubTitle)}
            </TextDiv>
            <TextDiv maxWidth="15rem" modifiers={['ellipsis', 'short']}>
              {getOutputText(caseDescription, messages.undefinedComplaint)}
            </TextDiv>
          </PopoverTarget>
          <PopoverContent>
            <ScrollingPopoverContentWrapper modifiers={['smallText']}>
              <TextDiv modifiers={['bold', 'bright', 'bottomGap']}>
                {getOutputText(complaintTitle, messages.undefinedComplaintSubTitle)}
              </TextDiv>
              <TextDiv modifiers={['bottomGap']}>
                {getOutputText(caseDescription, messages.undefinedComplaint)}
              </TextDiv>
            </ScrollingPopoverContentWrapper>
          </PopoverContent>
        </Popover>
      </td>
      <td>
        {getOutputText(repairStatus, messages.status)}
      </td>
      <td>
        <TextDiv>
          {getOutputText(estimateTotal, messages.estimate)}
        </TextDiv>
        <StatusSpan modifiers={compact([approvalStatusModifier, 'bold', 'tall', 'uppercase'])}>
          {approvalStatus}
        </StatusSpan>
      </td>
      <td className="etr">
        <ETR caseInfo={caseInfo} maxWidth="6rem" />
      </td>
      <td>
        {getOutputText(downtime, messages.downtime)}
      </td>
      <td>
        <SeverityLabel
          color={severityColor}
          value={severityCount}
          small
        />
      </td>
      <td>
        <UnreadNotesLabel caseInfo={caseInfo} />
      </td>
      <td>
        <FollowUpLabel caseInfo={caseInfo} />
      </td>
    </tr>
  );
}

CaseListRow.propTypes = {
  assetInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
};

export default CaseListRow;
