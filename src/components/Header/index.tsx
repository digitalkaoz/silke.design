import { FunctionComponent, memo } from 'react';

import './Header.css';

const Header: FunctionComponent = () => (
  <header>
    <div className="logo-column">
      <img src="/img/logo.svg" />

      <div className="headline">
        <h1>Hi! I&apos;m Silke,</h1>
        <p>
          a Product-Designer based in Hamburg with more than 20 years of professional experience. a
          Product-Designer based in Hamburg with more than 20 years of professional experience. a
          Product-Designer based in Hamburg with more than 20 years of professional experience.
        </p>
      </div>
    </div>

    <div className="profile-column">
      <img src="/img/profile.jpg" alt="Silke Schönthal - Product Designer" />
    </div>
  </header>
);

export default memo(Header);
