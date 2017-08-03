import React from 'react';

const Header = () =>
  <header>
    <h1>Silke.Design</h1>

    <div className="flower">
      <div className="drop drop--tl">
        <span>UI</span>
      </div>
      <div className="drop drop--tr">
        <span>UX</span>
      </div>
      <div className="drop drop--bl">
        <span>FE</span>
      </div>
      <div className="drop drop--br drop--pic" />
    </div>
  </header>;

export default Header;
