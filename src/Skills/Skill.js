import React from 'react';

import Icon from '../Icon/Icon';

const Skill = props =>
  <div className="skill">
    <h2>
      {props.name}
    </h2>
    <p>
      {props.description}
    </p>
    <hr />
    <div className="icons">
      {props.icons.map(icon => <Icon key={icon.src} {...icon} />)}
    </div>
  </div>;

export default Skill;
