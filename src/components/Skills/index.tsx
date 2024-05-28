import {
    memo,
    FunctionComponent,
    useState,
    useCallback
} from "react";
import LinesEllipsis from 'react-lines-ellipsis'

import Icon, {IconProps} from "../Icon";
import {isMobile} from "../../utils";
import "./Skills.scss";

export type SkillProps = {
    name: string;
    description: string;
    icons: Array<IconProps>;
};

const Skill: FunctionComponent<SkillProps> = ({name, description, icons}) => {
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
            <hr/>
            <div className="icons">
                {icons.map(icon => (
                    <Icon key={icon.src} {...icon} />
                ))}
            </div>
            <LinesEllipsis
                onClick={expand}
                text={description}
                maxLine={lines}
                component="p"
                ellipsis=" ⌵"
            />
        </div>
    );
};

export type SkillsProps = {
    skills: Array<SkillProps>;
};

const Skills: FunctionComponent<SkillsProps> = ({skills}) => (
    <div id="skills">
        {skills.map(skill => (
            <Skill key={skill.name} {...skill} />
        ))}
    </div>
);

export default memo(Skills);
