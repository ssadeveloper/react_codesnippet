import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CategoryHeader from 'components/CategoryHeader';
import paginateFavorites from 'components/_common/paginateFavorites';

import PageContentPanel from 'elements/PageContentPanel';

import CasesCardView from './CasesCardView';
import CasesListView from './CasesListView';
import CasesMapView from './CasesMapView';

function getCasesView(casesView) {
  switch (casesView) {
    case 'list':
      return CasesListView;
    case 'map':
      return CasesMapView;
    case 'card':
    default:
      return CasesCardView;
  }
}


class CasesPanel extends Component {
  static propTypes = {
    cases: ImmutablePropTypes.list.isRequired,
    casesRequesting: PropTypes.bool,
    casesView: PropTypes.string.isRequired,
    favoritePagination: ImmutablePropTypes.map.isRequired,
    refreshCases: PropTypes.func.isRequired,
    requestNext: PropTypes.func.isRequired,
  };

  static defaultProps = {
    casesRequesting: false,
  };

  componentWillMount() {
    this.PaginatedCasesView = this.buildPaginatedCasesView(this.props.casesView);
  }

  componentWillReceiveProps(nextProps) {
    // If the users has changed view types, a new HOC wrapped component must be made.
    if (this.props.casesView !== nextProps.casesView) {
      this.PaginatedCasesView = this.buildPaginatedCasesView(nextProps.casesView);
    }
  }

  buildPaginatedCasesView = (viewType) => {
    // define the component that will be displayed with the super pagination powers.
    const CasesView = getCasesView(viewType);

    // add methods concerning pagination
    const paginationMethods = {
      requestNext: this.props.requestNext,
    };

    return paginateFavorites(paginationMethods)(CasesView);
  }

  render() {
    const {
      cases,
      casesRequesting,
      refreshCases,
      favoritePagination,
    } = this.props;

    const { PaginatedCasesView } = this;

    const componentProps = {
      cases,
      requesting: casesRequesting,
      favoritePagination,
    };

    return (
      <PageContentPanel id="cases-panel">
        <CategoryHeader
          refresh={refreshCases}
          requesting={casesRequesting}
          favoritePagination={favoritePagination}
          type="case"
        />
        <PaginatedCasesView
          componentProps={componentProps}
          favoritePagination={favoritePagination}
          requestInProgress={casesRequesting}
        />
      </PageContentPanel>
    );
  }
}

export default CasesPanel;
export CasesListView from './CasesListView';
