import React from 'react';

import Flower from '../Flower/Flower';

const Header = () => (
  <header>
    <img src="/img/logo.svg" alt="silke.design" />

    <div className="headline">
      <h1>Silke Schönthal - Portfolio</h1>
      <p>
        Seit über 10 Jahren bin ich im Online-Bereich tätig. <br />Meine Arbeit
        deckt die Bereiche User Experience, User Interface und Frontend
        Development ab.<br />Eine Auswahl meiner Projekte stelle ich hier vor.
      </p>
    </div>

    <Flower
      tl={{ name: 'UX' }}
      tr={{ name: 'UI' }}
      bl={{ name: 'FE' }}
      br={true}
    />
  </header>
);

export default Header;
