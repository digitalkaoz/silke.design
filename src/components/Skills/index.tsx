import { FunctionComponent } from 'react';

import Icon, { IconProps } from '../Icon';
import './skills.css';

export type SkillProps = {
  icons: Array<IconProps>;
};

export type SkillsProps = {
  tools: SkillProps;
};

const Skills: FunctionComponent<SkillsProps> = ({ tools }) => (
  <section id="skills">
    <h2>Responsibilities</h2>
    <ul className="responsibilities">
      <li>User Experience Design</li>
      <li>User Interface Design</li>
      <li>Interaction Design</li>
      <li>Prototyping</li>
      <li>Visual Design</li>
      <li>Design Systems</li>
      <li>Usability Testing</li>
      <li>Responsive Design</li>
      <li>Wireframing</li>
    </ul>
    <h2>Tools</h2>
    <div className="icons">
      {tools.icons.map((icon) => (
        <Icon key={icon.src} {...icon} />
      ))}
    </div>
  </section>
);

export default Skills;
