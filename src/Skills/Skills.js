import React from 'react';

import Skill from './Skill.js'

const Skills = () =>
  <div id="skills">
    <div className="row">
      <div className="col s12 m4">
        <Skill name="UI-Design"></Skill>
      </div>
      <div className="col s12 m4">
        <Skill name="UX-Design"></Skill>
      </div>
      <div className="col s12 m4">
        <Skill name="Frontend"></Skill>
      </div>
    </div>
  </div>

export default Skills;