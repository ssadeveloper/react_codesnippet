import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getOutputText } from 'utils/widget';

import {
  WidgetWrapper,
  Widget,
  WidgetHeader,
  WidgetItem,
} from 'elements/Widget';
import Link from 'elements/Link';

import Title from './Title';
import Content from './Content';
import messages from './messages';

function Complaint({ caseInfo }) {
  const complaintCode = caseInfo.getIn(['complaint', 'code']);
  const complaintDescription = caseInfo.getIn(['complaint', 'description']);
  const title = complaintCode && complaintDescription ?
    (
      <Link to="#" modifiers={['hoverCaret']}>
        {complaintCode} - {complaintDescription}
      </Link>
    )
    : '';

  return (
    <WidgetWrapper>
      <Widget id="complaints" expandKey="complaints">
        <WidgetHeader>
          <FormattedMessage {...messages.title} />
        </WidgetHeader>
        <WidgetItem>
          <Title>
            {getOutputText(title, messages.undefinedComplaintTitle)}
          </Title>
          <Content>
            {getOutputText(caseInfo.get('description'), messages.undefinedComplaint)}
          </Content>
        </WidgetItem>
      </Widget>
    </WidgetWrapper>
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

Complaint.defaultProps = {
  caseInfo: Map(),
};

export default Complaint;
