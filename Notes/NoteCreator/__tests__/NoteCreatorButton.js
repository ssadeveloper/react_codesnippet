import React from 'react';
import { noop } from 'lodash';

import {
  test,
  expect,
  shallow,
  createSpy,
} from '__tests__/helpers/test-setup';

import NoteCreatorButton from '../NoteCreatorButton';
import messages from '../messages';

const testProps = {
  onClick: noop,
};

function shallowRender(props = testProps) {
  return shallow(<NoteCreatorButton {...props} />);
}

test('passes correct props to RectangleButton', () => {
  const component = shallowRender({ ...testProps, withText: true });
  const button = component.find('RectangleButton');
  expect(button.props()).toContain({
    modifiers: [
      'hoverBrandBright',
      'hoverShadow',
      'hoverUnderline',
      'pureWhite',
      'wide',
    ],
  });
});

test('renders the plus FontAwesome icon', () => {
  const component = shallowRender();
  const icon = component.find('FontAwesome');
  expect(icon).toExist();
  expect(icon).toHaveProp('name', 'plus');
});

test('does not render RectangleButtonText if not requested', () => {
  const component = shallowRender();
  expect(component).toNotContain('RectangleButtonText');
});

test('does render RectangleButtonText with correct message', () => {
  const component = shallowRender({ ...testProps, withText: true });
  const text = component.find('RectangleButtonText');
  expect(text).toExist();
  expect(text).toContain('FormattedMessage');
  expect(text.find('FormattedMessage')).toHaveProps({ ...messages.newNote });
});

test('clicking button calls onClick prop', () => {
  const onClickSpy = createSpy();
  const component = shallowRender({ ...testProps, onClick: onClickSpy });
  component.simulate('click');
  expect(onClickSpy).toHaveBeenCalled();
});
