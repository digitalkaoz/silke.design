import React from 'react';

const Icon = props =>
  <a href={props.target || '#'} target="_blank" rel="noopener" className="icon">
    <img data-original={props.src} alt={props.name} />
  </a>;

export default Icon;
