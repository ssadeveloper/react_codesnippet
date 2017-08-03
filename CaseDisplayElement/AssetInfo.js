import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import { getOutputText } from 'utils/widget';

import {
  CardElement,
  CardTable,
  CardTableRow,
} from 'elements/Card';

import messages from './messages';

function AssetInfo({ assetInfo }) {
  return (
    <CardElement>
      <CardTable modifiers={['uppercase']} tdModifiers={['active', 'leftAlign']}>
        <tbody>
          <CardTableRow>
            <th>
              <FormattedMessage {...messages.unit} />
            </th>
            <td>
              {getOutputText(assetInfo.get('unitNumber'), messages.unit)}
            </td>
          </CardTableRow>
          <CardTableRow type="topGap">
            <th>
              <FormattedMessage {...messages.vin} />
            </th>
            <td>
              {getOutputText(assetInfo.get('vinNumber'), messages.vin)}
            </td>
          </CardTableRow>
        </tbody>
      </CardTable>
    </CardElement>
  );
}

AssetInfo.propTypes = {
  assetInfo: ImmutablePropTypes.contains({
    unitNumber: PropTypes.string,
    vinNumber: PropTypes.string,
  }).isRequired,
};

export default AssetInfo;
