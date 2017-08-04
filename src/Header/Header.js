import React from 'react';

import Flower from '../Flower/Flower';

const Header = () =>
  <header>
    <div className="headline">
      <h1>silke.design</h1>
      <h3>Silke Schönthal - Portfolio</h3>
      <p>Lorem Ipsum</p>
    </div>

    <Flower
      tl={{ name: 'UI' }}
      tr={{ name: 'UX' }}
      bl={{ name: 'FE' }}
      br={true}
    />
  </header>;

export default Header;
