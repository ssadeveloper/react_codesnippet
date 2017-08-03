import React from 'react';
import { Link } from 'react-router-dom';

import LogoImg from './LogoImg';

import logoImage from './DecisivLogo_Blue_TM_Small.png';

function Logo() {
  return (
    // FIXME: Show this link when the app is branded for a customer
    <Link to="/" style={{ visibility: 'hidden' }}>
      <LogoImg src={logoImage} alt="Logo" />
    </Link>
  );
}

export default Logo;
