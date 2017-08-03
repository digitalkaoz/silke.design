import React from 'react';

import skills from './skills.json';
import Skill from './Skill.js';

const Skills = () =>
  <div id="skills">
    {skills.map(skill => <Skill key={skill.name} {...skill} />)}
  </div>;

export default Skills;
