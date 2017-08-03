import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import SeverityLabel from 'components/SeverityLabel';
import UnreadNoteLabel from 'components/UnreadNoteLabel';

import BreadCrumbLink from 'components/_common/BreadCrumbLink';

import PageHeadingTitle from 'elements/PageHeadingTitle';
import {
  SplitBlock,
  SplitBlockPart,
  SplitBlockElement,
} from 'elements/SplitBlock';
import Table from 'elements/Table';

import messages from './messages';

function CaseOverview({ assetInfo, caseInfo, collapsed, latestFavorite }) {
  const unreadNoteCount = Number(caseInfo.get('unreadNotesCount')) || 0;

  return (
    <SplitBlock id="case-overview">
      <SplitBlockPart modifiers={['left', 'wide']}>
        <SplitBlockElement type="padRight">
          <BreadCrumbLink collapsed={collapsed} latestFavorite={latestFavorite} />
          <PageHeadingTitle modifiers={['noPad']}>
            <FormattedMessage {...messages.title} values={{ caseId: caseInfo.get('id') }} />
          </PageHeadingTitle>
        </SplitBlockElement>
        <SplitBlockElement type="padLeft">
          <Table id="case-overview-asset-information" type="secondary">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage {...messages.unit} />
                </th>
                <td>
                  {assetInfo.get('unitNumber')}
                </td>
                <th>
                  <FormattedMessage {...messages.year} />
                </th>
                <td>
                  {assetInfo.get('year')}
                </td>
                <th>
                  <FormattedMessage {...messages.make} />
                </th>
                <td>
                  {assetInfo.get('make')}
                </td>
                <th>
                  <FormattedMessage {...messages.model} />
                </th>
                <td>
                  {assetInfo.get('model')}
                </td>
              </tr>
            </tbody>
          </Table>
        </SplitBlockElement>
      </SplitBlockPart>
      <SplitBlockPart modifiers={['right', 'xNarrow']}>
        <SplitBlockElement type="pad">
          <SeverityLabel
            color={caseInfo.get('severityColor')}
            value={Number(caseInfo.get('severityCount'))}
          />
        </SplitBlockElement>
        {unreadNoteCount > 0 &&
        <SplitBlockElement type="padLeft">
          <UnreadNoteLabel count={unreadNoteCount} />
        </SplitBlockElement>
        }
      </SplitBlockPart>
    </SplitBlock>
  );
}

CaseOverview.propTypes = {
  assetInfo: ImmutablePropTypes.contains({
    unitNumber: PropTypes.string,
    year: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
  }).isRequired,
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
    severityColor: PropTypes.string,
    severityCount: PropTypes.string,
  }).isRequired,
  collapsed: PropTypes.bool.isRequired,
  latestFavorite: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    message: PropTypes.object,
  }),
};

CaseOverview.defaultProps = {
  assetInfo: Map(),
  caseInfo: Map({
    severityColor: 'grey',
    severityCount: '0',
  }),
  collapsed: true,
  latestFavorite: {},
};

export default CaseOverview;
