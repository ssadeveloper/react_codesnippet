import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import SeverityLabel from 'components/SeverityLabel';

import { CardElement } from 'elements/Card';
import Link from 'elements/Link';
import { SplitBlock, SplitBlockElement, SplitBlockPart } from 'elements/SplitBlock';

import messages from './messages';

function CaseTitle({ caseInfo }) {
  const caseId = caseInfo.get('id');

  return (
    <CardElement>
      <SplitBlock pad="none">
        <SplitBlockPart modifiers={['left', 'wide']}>
          <SplitBlockElement type="padRight">
            <Link to={`/cases/${caseId}`} modifiers={['heavy', 'uppercase']}>
              <FormattedMessage {...messages.title} values={{ caseId }} />
            </Link>
          </SplitBlockElement>
          <SplitBlockElement>
            <SeverityLabel
              color={caseInfo.get('severityColor')}
              value={Number(caseInfo.get('severityCount'))}
              small
            />
          </SplitBlockElement>
        </SplitBlockPart>
      </SplitBlock>
    </CardElement>
  );
}

CaseTitle.propTypes = {
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
    severityColor: PropTypes.string,
    severityCount: PropTypes.string,
  }).isRequired,
};

export default CaseTitle;
