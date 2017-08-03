import React from 'react';
import { noop } from 'lodash';
import { Map } from 'immutable';

import {
  test,
  expect,
  shallow,
} from '__tests__/helpers/test-setup';

import CategoryHeader from '../index';

const totalCount = '3';

const defaultProps = {
  favoritePagination: Map({ totalCount }),
  refresh: noop,
  type: 'case',
};

function shallowRender(props = defaultProps) {
  return shallow(<CategoryHeader {...props} />);
}

test('CategoryHeader renders RefreshBlock with expected props', () => {
  const component = shallowRender();
  expect(component).toContain('RefreshBlock');
  const refreshBlock = component.find('RefreshBlock');
  expect(refreshBlock).toHaveProps({
    type: defaultProps.type,
    count: totalCount,
    requesting: false,
    refresh: defaultProps.refresh,
  });
});
