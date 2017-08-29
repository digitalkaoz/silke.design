import React, { Component } from 'react';

import Icon from '../Icon/Icon';
import LazyLoad from '../LazyLoad/LazyLoad';

class Footer extends Component {
  render = () => (
    <footer ref={container => (this.container = container)}>
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
    </footer>
  );
}

export default LazyLoad(Footer);
