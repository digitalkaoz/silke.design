import React, { Component } from 'react';

import skills from './skills.json';
import Skill from './Skill.js';
import LazyLoad from '../LazyLoad/LazyLoad';

class Skills extends Component {
  render = () => (
    <div id="skills" ref={container => (this.container = container)}>
      {skills.map(skill => <Skill key={skill.name} {...skill} />)}
    </div>
  );
}

export default LazyLoad(Skills);
