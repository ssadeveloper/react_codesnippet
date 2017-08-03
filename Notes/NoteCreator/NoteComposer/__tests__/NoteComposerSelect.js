import React from 'react';
import { fromJS } from 'immutable';

import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';

import NoteComposerSelect, { buildOptions } from '../NoteComposerSelect';

const group1 = {
  companyName: 'Volvo',
  id: '12',
};
const group2 = {
  companyName: 'Mack',
  id: '23',
};

const user1 = {
  email: 'abc@abc.com',
  id: '333',
  firstName: 'Bill',
  lastName: 'Lentz',
};
const user2 = {
  email: 'hey@gmail.com',
  id: '353',
  firstName: 'Sara',
  lastName: 'Howes',
};
const user3 = {
  email: 'hey@gmail.com',
  id: '453',
  firstName: 'New',
  lastName: 'User',
};

const caseRecipients = fromJS([
  {
    group: group1,
    user: user1,
  },
  {
    group: group2,
    user: user2,
  },
  {
    group: group1,
    user: user3,
  },
]);

// expected output of `buildOptions` given the above `caseRecipients`
const builtOptions = [
  {
    label: 'Volvo',
    options: [
      {
        companyName: 'Volvo',
        groupId: '12',
        label: 'Bill Lentz',
        userId: '333',
        value: '333',
      },
      {
        companyName: 'Volvo',
        groupId: '12',
        label: 'New User',
        userId: '453',
        value: '453',
      },
    ],
  },
  {
    label: 'Mack',
    options: [
      {
        companyName: 'Mack',
        groupId: '23',
        label: 'Sara Howes',
        userId: '353',
        value: '353',
      },
    ],
  },
];

const selectedRecipients = [
  {
    label: 'first user name',
    value: {},
  },
  {
    label: 'second user name',
    value: {},
  },
];

const defaultProps = {
  caseRecipients,
  handleChangeRecipient: () => true,
  selectedRecipients,
};

function shallowRender(props = defaultProps) {
  return (shallow(<NoteComposerSelect {...props} />));
}

test('component has correct props', () => {
  const component = shallowRender();
  expect(component).toHaveProps({
    multi: true,
    onChange: defaultProps.handleChangeRecipient,
    value: selectedRecipients,
  });
  expect(component.props().options.length).toBe(2);
});

test('buildOptions returns correct grouped options from test data', () => {
  const output = buildOptions(caseRecipients);
  expect(output).toEqual(builtOptions);
});
