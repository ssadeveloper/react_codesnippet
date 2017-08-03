import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Select from 'elements/Select';

import { recipientToOption } from '../../utils';

/**
 * Builds an array of recipient options that are used in the `react-select-plus` component.
 * The given `recipients` are collected together based on shared `group` values so that they
 * appear as `optgroups` in the rendered select.
 *
 * @param {Immutable.List} recipients: a list of `group` and `user` pairs received from the API.
 *  Example:
 *    recipients = fromJS([
 *      {
 *        group: {
 *          companyName: ‘Volvo’,
 *          id: ’12’,
 *        },
 *        user: {
 *          email: ‘abc@abc.com’,
 *          id: ’333’,
 *          firstName: ‘Bill’,
 *          lastName: ‘Lentz’,
 *        },
 *      },
 *      {
 *        group: {...},
 *        user: {...},
 *      },
 *    ]);
 * @return {Array} grouped options based on the user's groups
 *  Example:
 *    returnArray = [
 *      {
 *        label: <group_company_name>,
 *        options: [ ...results from `recipientToOption` for each recipient ]
 *      },
 *      {
 *        label: <group_company_name>,
 *        options: [ ...results from `recipientToOption` for each recipient ]
 *      }
 *    ];
 */
export function buildOptions(recipients) {
  const groupedData = {};
  recipients.map((recipient) => {
    const name = recipient.getIn(['group', 'companyName']);
    groupedData[name] = groupedData[name] || [];
    groupedData[name].push(recipient);
    return true;
  });

  const options = [];
  Object.keys(groupedData).map((name) => {
    const recipientsInGroup = groupedData[name];
    options.push({
      label: name,
      options: recipientsInGroup.map(recipientToOption),
    });
    return true;
  });

  return options;
}

/**
 * Get the text from the given option for use in the display of this option when
 * it is selected.  In the option list, the recipients show only the user name
 * (grouped under the company), but in the selected-value UI, the user name should
 * have the company name appended.
 * @param {{label: string, companyName: string}} option
 * @returns {string}
 */
function valueRenderer(option) {
  const companyName = option.companyName;
  const userName = option.label;
  return `${userName} (${companyName})`;
}

// FIXME: This component should be re-implemented as per the actual design
function NoteComposerSelect({ caseRecipients, selectedRecipients, handleChangeRecipient }) {
  const options = buildOptions(caseRecipients);
  return (
    <Select
      multi
      onChange={handleChangeRecipient}
      options={options}
      value={selectedRecipients}
      valueRenderer={valueRenderer}
    />
  );
}

NoteComposerSelect.propTypes = {
  caseRecipients: ImmutablePropTypes.list.isRequired,
  selectedRecipients: PropTypes.arrayOf(PropTypes.object),
  handleChangeRecipient: PropTypes.func.isRequired,
};

NoteComposerSelect.defaultProps = {
  selectedRecipients: [],
};

export default NoteComposerSelect;
