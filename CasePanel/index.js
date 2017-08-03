import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CaseDetail from './CaseDetail';
import Wrapper from './Wrapper';

function CasePanel({
  assetInfo,
  caseFaults,
  caseInfo,
  serviceProviderInfo,
  selectedActionItemId,
  selectedDropdownItemId,
}) {
  return (
    <Wrapper id="case-panel" >
      <CaseDetail
        caseInfo={caseInfo}
        assetInfo={assetInfo}
        serviceProviderInfo={serviceProviderInfo}
        caseFaults={caseFaults}
        selectedActionItemId={selectedActionItemId}
        selectedDropdownItemId={selectedDropdownItemId}
      />
    </Wrapper>
  );
}

CasePanel.propTypes = {
  assetInfo: ImmutablePropTypes.map,
  caseFaults: ImmutablePropTypes.listOf(
    ImmutablePropTypes.map,
  ),
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
  serviceProviderInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }),
  selectedActionItemId: PropTypes.string,
  selectedDropdownItemId: PropTypes.string,
};

CasePanel.defaultProps = {
  assetInfo: Map(),
  caseFaults: List(),
  serviceProviderInfo: Map(),
  selectedActionItemId: '',
  selectedDropdownItemId: '',
};

export default CasePanel;
