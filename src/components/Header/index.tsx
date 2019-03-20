import React from 'react';

import Flower from '../Flower';
import "./Header.scss";

const Header = () => (
  <header>
    <img src="/img/logo.svg" alt="silke.design" />

    <div className="headline">
      <h1>Silke Schönthal - Portfolio</h1>
      <p>
        Seit über 10 Jahren bin ich im Online-Bereich tätig und beschäftige mich
        mit den Themen "User Experience", "User Interface" und "Frontend
        Development".<br />Eine Auswahl meiner Projekte gibt es hier zu sehen.
      </p>
    </div>

    <Flower
      tl={{ name: 'UX' }}
      tr={{ name: 'UI' }}
      bl={{ name: 'FE' }}
      br={{}}
    />
  </header>
);

export default Header;
