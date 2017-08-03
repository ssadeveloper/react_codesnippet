import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ContainerQuery from 'components/ContainerQuery';

import CaseDisplayContainer from 'containers/CaseDisplayContainer';

import { CardGrid } from 'elements/Card';
import { CARDS_GRID_BREAKPOINTS } from 'elements/Card/CardGrid';
import CardLoading from 'components/_common/CardLoading';

import { shouldBuildLoadingGhosts } from 'utils/favorites';

const MAX_LOADING_CARDS = 8;

function renderCaseCards(cases) {
  return cases.map(c => (
    <CaseDisplayContainer
      key={c.get('id')}
      breakpoint
      caseInfo={c}
      type="card"
    />
  ));
}

function renderGhostCards(cases, favoritePagination, requesting) {
  if (!shouldBuildLoadingGhosts({ currentCount: cases.size, favoritePagination, requesting })) {
    return null;
  }
  const totalCount = favoritePagination.get('totalCount');
  const count = totalCount ?
    Math.min(MAX_LOADING_CARDS, totalCount - cases.size) :
    MAX_LOADING_CARDS;
  return Array.from(
    { length: count },
    (_, i) => <CardLoading key={i} breakpoint />,
  );
}

function CasesCardView({ cases, favoritePagination, requesting }) {
  return (
    <ContainerQuery breakpoints={CARDS_GRID_BREAKPOINTS}>
      <CardGrid>
        {renderCaseCards(cases)}
        {renderGhostCards(cases, favoritePagination, requesting)}
      </CardGrid>
    </ContainerQuery>
  );
}

CasesCardView.propTypes = {
  cases: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.string,
    }),
  ).isRequired,
  favoritePagination: ImmutablePropTypes.map.isRequired,
  requesting: PropTypes.bool.isRequired,
};

export default CasesCardView;
