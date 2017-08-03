import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { scroller, Element } from 'react-scroll';

import {
  Grid,
  GridBlock,
} from 'elements/Grid';

import EstimateInvoice from 'components/EstimateInvoice';
import AssetsWidget from 'components/AssetsWidget';
import CaseLocation from 'components/CaseLocation';
import ServiceProvider from 'components/ServiceProvider';
import Complaint from 'components/Complaint';
import ServiceRequest from 'components/ServiceRequest';
import Diagnostics from 'components/Diagnostics';

import NotesContainer from 'containers/NotesContainer';
import {
  JUMP_TO,
  ESTIMATE_INVOICE,
  ASSETS,
  COMPLAINTS,
  SERVICE_PROVIDER,
  DIAGNOSTICS,
  SERVICE_REQUEST,
  ASSET_LOCATION,
  NOTES,
} from 'containers/CasePage/constants';

import dimensions from 'style/dimensions';

class CaseDetail extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      selectedActionItemId,
      selectedDropdownItemId,
    } = nextProps;

    if (selectedActionItemId === JUMP_TO) {
      if (this.props.selectedDropdownItemId !== selectedDropdownItemId) {
        scroller.scrollTo(selectedDropdownItemId, {
          duration: 500,
          smooth: true,
          offset: -dimensions.topNavHeightInPixel,
        });
      }
    }
  }

  render() {
    const {
      assetInfo,
      caseFaults,
      caseInfo,
      serviceProviderInfo,
    } = this.props;

    return (
      <Grid>
        {/*
          For widgets to sit on the top layout, use below code:
          <GridBlock position="top">
            ...Widget
          </GridBlock>
        */}
        <GridBlock position="left">
          <Element name={ESTIMATE_INVOICE}>
            <EstimateInvoice caseInfo={caseInfo} />
          </Element>
          <Element name={COMPLAINTS}>
            <Complaint caseInfo={caseInfo} />
          </Element>
          <Element name={DIAGNOSTICS}>
            <Diagnostics caseFaults={caseFaults} assetInfo={assetInfo} />
          </Element>
          <Element name={NOTES}>
            <NotesContainer caseInfo={caseInfo} />
          </Element>
        </GridBlock>
        <GridBlock position="right">
          <Element name={ASSETS}>
            <AssetsWidget assetInfo={assetInfo} />
          </Element>
          <Element name={SERVICE_PROVIDER}>
            <ServiceProvider serviceProviderInfo={serviceProviderInfo} />
          </Element>
          <Element name={SERVICE_REQUEST}>
            <ServiceRequest caseInfo={caseInfo} />
          </Element>
          <Element name={ASSET_LOCATION}>
            <CaseLocation
              assetInfo={assetInfo}
              serviceProviderInfo={serviceProviderInfo}
            />
          </Element>
        </GridBlock>
      </Grid>
    );
  }
}

CaseDetail.propTypes = {
  assetInfo: ImmutablePropTypes.map,
  caseFaults: ImmutablePropTypes.listOf(
    ImmutablePropTypes.map,
  ),
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }),
  serviceProviderInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }),
  selectedActionItemId: PropTypes.string,
  selectedDropdownItemId: PropTypes.string,
};

CaseDetail.defaultProps = {
  // Because we expect caseInfo to be an Immutable Map, we must provide an
  // Immutable Map as the default as well
  assetInfo: Map(),
  caseFaults: List(),
  caseInfo: Map({
    id: '',
  }),
  serviceProviderInfo: Map({
    id: '',
  }),
  selectedActionItemId: '',
  selectedDropdownItemId: '',
};

export default CaseDetail;
