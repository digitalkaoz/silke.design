import React from 'react';

import Flower from '../Flower/Flower';

const Header = () =>
  <header>
    <img src="/img/logo.svg" alt="silke.design" />

    <div className="headline">
      <h1>Silke Schönthal - Portfolio</h1>
      <p>
        Ich bin seit 2009 in Hamburg im Online-Bereich tätig. Meine Arbeit ist
        ein Mix aus Frontend, Konzeption und Design.
      </p>
    </div>

    <Flower
      tl={{ name: 'UX' }}
      tr={{ name: 'UI' }}
      bl={{ name: 'FE' }}
      br={true}
    />
  </header>;

export default Header;
