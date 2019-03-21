import React, {PureComponent, memo } from "react";
import Icon, { IconProps } from "../Icon";
import EllipsisText from "react-lines-ellipsis";

import {isMobile} from "../..";

import "./Skills.scss";

export type SkillProps = {
  name: string;
  description: string;
  icons: Array<IconProps>;
};

class Skill extends PureComponent<SkillProps, any> {
  constructor(props:SkillProps) {
    super(props);

    this.state = {lines: isMobile() ? 5 : 100};
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick() {
    if (!isMobile()) {
      return;
    }
    this.setState({lines: 100});
  }

  render() {
    const { name, description, icons } = {...this.props};

    return (
    <div className="skill">
    <h2>{name}</h2>
    <hr />
    <div className="icons">
      {icons.map(icon => (
        <Icon key={icon.src} {...icon} />
      ))}
    </div>
    <EllipsisText onClick={this.handleClick} basedOn="words" text={description} maxLine={this.state.lines} component="p"/>
  </div>  
    );
  }
}

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
