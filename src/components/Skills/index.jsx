import React from 'react';

import Skill from './Skill';
import "./Skills.scss";

const Skills = ({skills}) =>
    <div id="skills">
      {skills.map(skill => <Skill key={skill.name} {...skill} />)}
    </div>

export default Skills;
