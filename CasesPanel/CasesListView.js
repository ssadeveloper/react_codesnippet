import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import ContainerQuery from 'components/ContainerQuery';

import CaseDisplayContainer from 'containers/CaseDisplayContainer';
import { CARDS_GRID_BREAKPOINTS } from 'elements/Card/CardGrid';
import ListTable from 'elements/ListTable';
import TableWrapper from 'elements/TableWrapper';

import { shouldBuildLoadingGhosts } from 'utils/favorites';

import ListRowLoading from 'components/_common/ListRowLoading';

import messages from './messages';

const MAX_LOADING_ROWS = 10;

function renderCaseList(cases) {
  return cases.map((caseInfo) => {
    const caseId = caseInfo.get('id');
    return (
      <CaseDisplayContainer
        breakpoint
        caseInfo={caseInfo}
        key={caseId}
        type="list"
      />
    );
  });
}

function renderGhostRows(cases, favoritePagination, requesting) {
  if (!shouldBuildLoadingGhosts({ currentCount: cases.size, favoritePagination, requesting })) {
    return null;
  }
  const totalCount = favoritePagination.get('totalCount');
  const count = totalCount ?
    Math.min(MAX_LOADING_ROWS, totalCount - cases.size) :
    MAX_LOADING_ROWS;
  return Array.from(
    { length: count },
    (_, i) =>
      <ListRowLoading
        key={i}
        columnSpans={[3, 1, 4, 3]}
      />,
  );
}

function CasesListView({ cases, favoritePagination, requesting }) {
  return (
    <ContainerQuery breakpoints={CARDS_GRID_BREAKPOINTS}>
      <TableWrapper>
        <ListTable
          modifiers={['borderCollapse', 'fullWidth']}
          thModifiers={['clickable', 'darkGray', 'leftAlign', 'midWeight']}
          trModifiers={['hoverHighlight', 'lined']}
        >
          <thead>
            <tr>
              <th><FormattedMessage {...messages.caseNumber} /></th>
              <th><FormattedMessage {...messages.unitNumber} /></th>
              <th><FormattedMessage {...messages.serviceProvider} /></th>
              <th><FormattedMessage {...messages.complaint} /></th>
              <th><FormattedMessage {...messages.status} /></th>
              <th><FormattedMessage {...messages.estimate} /></th>
              <th><FormattedMessage {...messages.etr} /></th>
              <th><FormattedMessage {...messages.downtime} /></th>
              <th><FormattedMessage {...messages.severity} /></th>
              <th><FormattedMessage {...messages.notes} /></th>
              <th><FormattedMessage {...messages.followup} /></th>
            </tr>
          </thead>
          <tbody>
            {renderCaseList(cases)}
            {renderGhostRows(cases, favoritePagination, requesting)}
          </tbody>
        </ListTable>
      </TableWrapper>
    </ContainerQuery>
  );
}

CasesListView.propTypes = {
  cases: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.string,
    }),
  ).isRequired,
  favoritePagination: ImmutablePropTypes.map.isRequired,
  requesting: PropTypes.bool.isRequired,
};

CasesListView.defaultProps = {
  favoritePagination: Map(),
  requesting: false,
};

export default CasesListView;
