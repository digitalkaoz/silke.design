import React from 'react';

import Flower from '../Flower/Flower';

const Header = () =>
  <header>
    <div className="headline">
      <h1>Silke.Design</h1>
      <p>lorem ipsum</p>
    </div>

    <Flower
      tl={{ name: 'UI' }}
      tr={{ name: 'UX' }}
      bl={{ name: 'FE' }}
      br={true}
    />
  </header>;

export default Header;
