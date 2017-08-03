import React from 'react';
import { test, expect, shallow } from '__tests__/helpers/test-setup';
import { Map } from 'immutable';

import UserInfo from '../index';

function renderComponent({ expanded = false, userProfile = Map() } = {}) {
  return shallow(<UserInfo expanded={expanded} userProfile={userProfile} />);
}

test('Renders caret-down FontAwesome icon', () => {
  const wrapper = renderComponent();
  expect(wrapper).toContain('FontAwesome');
  expect(wrapper.find('FontAwesome')).toHaveProp('name', 'caret-down');
});

// ------------------ user profile display ------------------

const firstName = 'Huey';
const lastName = 'Lewis';
const jobTitle = 'Lead Singer';
const companyName = 'The News';
const userProfile = Map({ firstName, lastName, jobTitle, companyName });

test('Renders the first name if available', () => {
  const wrapper = renderComponent({ userProfile: userProfile.delete('lastName') });
  expect(wrapper.find('UserInfoLabel').first().render().text()).toEqual(firstName);
});

test('Renders the last name if available', () => {
  const wrapper = renderComponent({ userProfile: userProfile.delete('firstName') });
  expect(wrapper.find('UserInfoLabel').first().render().text()).toEqual(lastName);
});

test('Renders both first and last names if available', () => {
  const wrapper = renderComponent({ userProfile });
  expect(wrapper.find('UserInfoLabel').first().render().text()).toEqual(`${firstName} ${lastName}`);
});

test('Renders the job title if available', () => {
  const wrapper = renderComponent({ userProfile });
  expect(wrapper.find('UserInfoLabel').last().render().text()).toEqual(jobTitle);
});

test('Renders the company name if no job title available', () => {
  const wrapper = renderComponent({ userProfile: userProfile.delete('jobTitle') });
  expect(wrapper.find('UserInfoLabel').last().render().text()).toEqual(companyName);
});

test('Renders two UserInfoLabels if both name and title are available', () => {
  const wrapper = renderComponent({ userProfile });
  expect(wrapper.find('UserInfoLabel').length).toEqual(2);
});

test('Renders the user avatar if the email is available', () => {
  const email = 'dot-com-for-murder.com';
  const wrapper = renderComponent({ userProfile: Map({ email }) });
  expect(wrapper).toContain('UserAvatar');
  expect(wrapper.find('UserAvatar')).toHaveProp('email', email);
});

test('Does not render the user avatar if the email is unavailable', () => {
  const wrapper = renderComponent({ userProfile: Map({ email: null }) });
  expect(wrapper).toNotContain('UserAvatar');
});

test('Renders the ghost user avatar when profile is unavailable', () => {
  const wrapper = renderComponent({ userProfile: Map() });
  expect(wrapper).toContain('GhostUserAvatar');
});

test('Renders the ghost user info when profile is unavailable', () => {
  const wrapper = renderComponent({ userProfile: Map() });
  expect(wrapper).toContain('UserInfoLabelWrapper GhostUserInfo');
});
