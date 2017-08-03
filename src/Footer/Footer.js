import React from 'react';

import Icon from '../Icon/Icon';

const Footer = () =>
  <footer>
    <div className="copyright">
      <p>Silke Schönthal</p>
      <p>Hamburg</p>
    </div>
    <Icon
      name="xing"
      target="https://www.xing.com/profile/Silke_Schoenthal"
      src="/img/xing.svg"
    />
    <Icon
      name="linkedin"
      target="https://www.linkedin.com/in/silke-sch%C3%B6nthal-878412140"
      src="/img/linkedin.svg"
    />
    <Icon
      name="twitter"
      target="https://twitter.com/sboe1979"
      src="/img/twitter.svg"
    />
  </footer>;

export default Footer;
