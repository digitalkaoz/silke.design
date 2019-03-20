import React, { memo } from "react";
import Icon, { IconProps } from "../Icon";

import "./Skills.scss";

export type SkillProps = {
  name: string;
  description: string;
  icons: Array<IconProps>;
};

const Skill = ({ name, description, icons }: SkillProps) => (
  <div className="skill">
    <h2>{name}</h2>
    <hr />
    <div className="icons">
      {icons.map(icon => (
        <Icon key={icon.src} {...icon} />
      ))}
    </div>
    <p>{description}</p>
  </div>
);

export type SkillsProps = {
  skills: Array<SkillProps>;
};

const Skills = ({ skills }: SkillsProps) => (
  <div id="skills">
    {skills.map(skill => (
      <Skill key={skill.name} {...skill} />
    ))}
  </div>
);

export default memo(Skills);
