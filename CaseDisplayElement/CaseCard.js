import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Card from 'elements/Card';
import Divider from 'elements/Divider';

import AdditionalInfo from './AdditionalInfo';
import AssetInfo from './AssetInfo';
import CaseInfo from './CaseInfo';
import CaseTitle from './CaseTitle';
import Complaint from './Complaint';
import ServiceProvider from './ServiceProvider';

function CaseCard({ assetInfo, caseInfo, serviceProviderInfo }) {
  return (
    <Card>
      <CaseTitle caseInfo={caseInfo} />
      <Divider modifiers={['gutter', 'heavy']} />
      <AssetInfo assetInfo={assetInfo} />
      <Divider modifiers={['gutter', 'light', 'narrow']} />
      <ServiceProvider serviceProviderInfo={serviceProviderInfo} />
      <Divider modifiers={['gutter', 'light', 'narrow']} />
      <Complaint caseInfo={caseInfo} />
      <Divider modifiers={['gutter', 'light', 'narrow']} />
      <CaseInfo caseInfo={caseInfo} />
      <Divider modifiers={['gutter', 'heavy']} />
      <AdditionalInfo caseInfo={caseInfo} />
    </Card>
  );
}

CaseCard.propTypes = {
  assetInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
  caseInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
  serviceProviderInfo: ImmutablePropTypes.contains({
    id: PropTypes.string,
  }).isRequired,
};

export default CaseCard;
