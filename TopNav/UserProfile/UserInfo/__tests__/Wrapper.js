import { test, expect } from '__tests__/helpers/test-setup';

import { wrapperColor } from '../Wrapper';

const brightBlue = 'bright blue';
const grey = 'grey';
const theme = {
  colors: { brightBlue, '#999999': grey },
};

test('Uses bright blue color when expanded', () => {
  expect(wrapperColor({ theme, expanded: true })).toEqual(brightBlue);
});

test('Uses grey color by default', () => {
  expect(wrapperColor({ theme, expanded: false })).toEqual(grey);
});
