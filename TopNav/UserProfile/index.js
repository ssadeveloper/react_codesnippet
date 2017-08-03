import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import UserInfoContainer from 'containers/UserInfoContainer';

import PopupMenu from 'components/PopupMenu';
import MenuItem from 'components/PopupMenu/MenuItem';
import MenuItemDivider from 'components/PopupMenu/MenuItemDivider';
import AbsoluteSmoothCollapse from 'components/AbsoluteSmoothCollapse';

import px2rem from 'utils/px2rem';

import Wrapper from './Wrapper';
import UserInfo from './UserInfo';
import UserPopupWrapper from './UserPopupWrapper';
import messages from './messages';

class UserProfile extends React.Component {

  state = {
    expanded: false,
  };

  handleClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  hidePopupMenu = (e) => {
    if (this.state.expanded) {
      e.stopPropagation();
      this.setState({ expanded: false });
    }
  }

  render() {
    const { expanded } = this.state;
    return (
      <Wrapper id="user-profile-wrapper" onClick={this.handleClick}>
        <UserInfoContainer around={UserInfo} expanded={expanded} />
        <AbsoluteSmoothCollapse
          expanded={expanded}
          heightTransition=".15s cubic-bezier(0, 1, 0.5, 1)"
          top={px2rem(70)}
          right="0"
        >
          <PopupMenu onOutsideClick={this.hidePopupMenu}>
            <UserPopupWrapper>
              <MenuItemDivider />
              <MenuItem>
                <Link to="/logout">
                  <FormattedMessage {...messages.logout} />
                </Link>
              </MenuItem>
            </UserPopupWrapper>
          </PopupMenu>
        </AbsoluteSmoothCollapse>
      </Wrapper>
    );
  }
}

export default UserProfile;
