import React, {
  memo,
  FunctionComponent,
  useState,
  useCallback
} from "react";
import ClampLines from "react-clamp-lines";

import Icon, { IconProps } from "../Icon";
import { isMobile, toId } from "../../utils";
import "./Skills.scss";

export type SkillProps = {
  name: string;
  description: string;
  icons: Array<IconProps>;
};

const Skill: FunctionComponent<SkillProps> = ({ name, description, icons }) => {
  const [lines, setLines] = useState(isMobile() ? 5 : 100); //TODO isMobile is a sideEffect

  const expand = useCallback(() => {
    if (!isMobile()) {
      return;
    }

    setLines(100);
  }, []);

  return (
    <div className="skill">
      <h2>{name}</h2>
      <hr />
      <div className="icons">
        {icons.map(icon => (
          <Icon key={icon.src} {...icon} />
        ))}
      </div>
      <ClampLines
        id={toId(name)}
        onClick={expand}
        text={description}
        lines={lines}
        innerElement="p"
        lessText=""
        moreText="⌵"
      />
    </div>
  );
};

export type SkillsProps = {
  skills: Array<SkillProps>;
};

const Skills: FunctionComponent<SkillsProps> = ({ skills }) => (
  <div id="skills">
    {skills.map(skill => (
      <Skill key={skill.name} {...skill} />
    ))}
  </div>
);

export default memo(Skills);
