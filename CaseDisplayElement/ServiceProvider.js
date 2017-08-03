import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { CardElement } from 'elements/Card';
import TextDiv from 'elements/TextDiv';

import { getOutputText } from 'utils/widget';

import messages from './messages';

function ServiceProvider({ serviceProviderInfo }) {
  const companyName = serviceProviderInfo.get('companyName');
  return (
    <CardElement>
      <TextDiv modifiers={['active', 'bold', 'ellipsis', 'oneLine', 'smallText']}>
        {getOutputText(companyName, messages.undefinedServiceProvider)}
      </TextDiv>
    </CardElement>
  );
}

ServiceProvider.propTypes = {
  serviceProviderInfo: ImmutablePropTypes.contains({
    companyName: PropTypes.string,
  }).isRequired,
};

export default ServiceProvider;
