import { FunctionComponent } from 'react';

import Project, { ProjectProps } from '../Project';

import './projects.css';

export type ProjectsProps = {
  projects: Array<ProjectProps>;
};

const Projects: FunctionComponent<ProjectsProps> = ({ projects }) => (
  <div id="projects">
    {projects.map((project, index) => (
      <Project key={index} {...project} direction={index % 2 === 0 ? 'ltr' : 'rtl'} />
    ))}
  </div>
);

export default Projects;
