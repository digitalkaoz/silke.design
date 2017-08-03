import React from 'react';

const Icon = props =>
  <a href={props.target} target="_blank" className="icon">
    <img src={props.src} alt={props.name} />
  </a>;

export default Icon;
