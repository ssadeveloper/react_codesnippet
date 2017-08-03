/**
 * Turn the given recipient (as received from the Redux store), build an option value for
 * use by the recipients multiselect component.  In addition to the required `label` and
 * `value` fields, extra fields will be included to help with rendering and processing of
 * the selected items.
 * @param {Immutable.Map} recipient
 * @returns {{label: string, companyName: string, userId: string, groupId: string, value: string}}
 */
export function recipientToOption(recipient) {
  const user = recipient.get('user');
  const group = recipient.get('group');
  return ({
    label: `${user.get('firstName')} ${user.get('lastName')}`,
    companyName: group.get('companyName'),
    userId: user.get('id'),
    groupId: group.get('id'),
    value: user.get('id'),
  });
}

/**
 * Given an array of selected note recipients from the multiselect, return an
 * array of objects representing these users for use by the API.  Each item
 * in the array will be an object with the `userId` and `groupId` of the
 * recipient.
 * @param {{userId: string, groupId: string}[]} selections
 * @returns {{userId: string, groupId: string}[]}
 */
export function selectedRecipientsforApi(selections) {
  return selections.map(selection => ({
    userId: selection.userId,
    groupId: selection.groupId,
  }));
}
