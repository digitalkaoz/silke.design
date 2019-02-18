import React from 'react';

import Icon from '../Icon';

const Footer = ({links}) =>
    <footer>
      <div className="copyright">
        <p>Silke Schönthal</p>
        <p>Hamburg</p>
      </div>
      {links.map(link => <Icon key={link.name} {...link} />)}
    </footer>

export default Footer;
