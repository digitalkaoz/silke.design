import React from 'react';

import Icon from '../Icon';

const Skill = ({name, description, icons}) => (
  <div className="skill">
    <h2>{name}</h2>
    <p>
      <span>{description}</span>
    </p>
    <hr />
    <div className="icons">
      {icons.map(icon => <Icon key={icon.src} {...icon} />)}
    </div>
  </div>
);

export default Skill;
