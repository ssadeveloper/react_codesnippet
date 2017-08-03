import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { camelCase, compact } from 'lodash';

import ETR from 'components/_common/ETR';

import { CardElement, CardTable, CardTableRow } from 'elements/Card';
import StatusSpan from 'elements/StatusSpan';

import { getOutputText } from 'utils/widget';

import messages from './messages';

function CaseInfo({ caseInfo }) {
  const approvalStatus = caseInfo.get('approvalStatus');
  const approvalStatusModifier = approvalStatus && camelCase(approvalStatus);
  const statusSpanModifiers = [approvalStatusModifier, 'bold', 'tall', 'uppercase'];
  return (
    <CardElement>
      <CardTable thModifiers={['wide']} tdModifiers={['leftAlign', 'midGreyText']}>
        <tbody>
          <CardTableRow>
            <th><FormattedMessage {...messages.status} /></th>
            <td colSpan="2">{getOutputText(caseInfo.get('repairStatus'), messages.status)}</td>
          </CardTableRow>
          <CardTableRow type="topGap">
            <th><FormattedMessage {...messages.etr} /></th>
            <td colSpan="2"><ETR caseInfo={caseInfo} /></td>
          </CardTableRow>
          <CardTableRow type="topGap">
            <th><FormattedMessage {...messages.downtime} /></th>
            <td colSpan="2">{getOutputText(caseInfo.get('downtime'), messages.downtime)}</td>
          </CardTableRow>
          <CardTableRow type="topGap">
            <th><FormattedMessage {...messages.estimate} /></th>
            <td>
              {getOutputText(caseInfo.get('estimateTotal'), messages.estimate)}
            </td>
            <td>
              <StatusSpan modifiers={compact(statusSpanModifiers)}>
                {approvalStatus}
              </StatusSpan>
            </td>
          </CardTableRow>
        </tbody>
      </CardTable>
    </CardElement>
  );
}

CaseInfo.propTypes = {
  caseInfo: ImmutablePropTypes.contains({
    estimateTotal: PropTypes.string,
    approvalStatus: PropTypes.string,
    repairStatus: PropTypes.string,
    etr: PropTypes.string,
    downtime: PropTypes.string,
  }).isRequired,
};

export default CaseInfo;
