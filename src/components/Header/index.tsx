import { FunctionComponent, memo } from 'react';

import './header.css';

const Header: FunctionComponent = () => (
  <header>
    <div className="logo-column">
      <img src="/img/logo.svg" alt="Portfolio Logo" />
    </div>
    <div className="text-column">
      <h1>Hi! I&apos;m Silke,</h1>
      <p>
        a Product-Designer based in Hamburg, with 20 years of professional experience in the digital
        world. I bring ideas to life through creativity, thoughtful designs and collaboration with
        engineers.
      </p>
    </div>
    <div className="profile-column">
      <div className="tk-blob">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.2 356.7">
          <path d="M271.9 50.3c30.6 29.3 51.3 75.5 46.6 123.9-4.6 48.4-34.6 99-86.5 136.3s-125.6 61.4-168.3 35.3S9.4 243.5 3.4 177.3C-2.7 111.2-3.1 55.2 24 26.7 51.1-1.9 105.9-2.9 153.4 2.8c47.6 5.8 88 18.2 118.5 47.5z"></path>
        </svg>
      </div>
      <img
        src="/img/profile.avif"
        decoding="async"
        loading="lazy"
        alt="Silke Schönthal - Product Designer"
      />
    </div>
  </header>
);

export default memo(Header);
