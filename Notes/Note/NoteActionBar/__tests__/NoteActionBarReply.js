import React from 'react';
import { noop } from 'lodash';

import {
  test,
  expect,
  shallow,
  createSpy,
} from '__tests__/helpers/test-setup';

import NoteActionBarReply from '../NoteActionBarReply';

const defaultProps = {
  handleClickReply: noop,
};

function shallowRender(props = defaultProps) {
  return shallow(<NoteActionBarReply {...props} />);
}

test('clicking the component triggers handleClickReply call', () => {
  const handleClickReply = createSpy();
  const preventDefaultSpy = createSpy();
  const component = shallowRender({ handleClickReply });
  component.simulate('click', { preventDefault: preventDefaultSpy });
  expect(handleClickReply).toHaveBeenCalled();
});
