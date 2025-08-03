import React, { FunctionComponent, memo } from 'react';

import Flower from '../Flower';
import "./Header.scss";

const Header: FunctionComponent<{}> = () => (
  <header>
    <img src="/img/logo.svg" alt="silke.design" />

    <div className="headline">
      <h1>Silke Schönthal - Portfolio</h1>
      <p>
      Ich bin seit etwa 20 Jahren im Bereich der digitalen Medien tätig und habe daher eine Menge Berufserfahrung sammeln können. Meine Aufgabenfelder waren sehr facettenreich,
      von Frontend-Entwicklung über Webdesign bis hin zur Konzeption von Workflows mit dem Kunden. Eine Auswahl meiner Projekte gibt es hier zu sehen.
      </p>
    </div>

    <Flower
      tl={{ name: 'UX' }}
      tr={{ name: 'UI' }}
      bl={{ name: '' }}
      br={{}}
    />
  </header>
);

export default memo(Header);
