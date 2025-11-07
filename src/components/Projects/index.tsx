import { FunctionComponent } from 'react';
import { ClientOnly } from 'vite-react-ssg'

import Project, { ProjectProps } from '../Project';

import './projects.css';

export type ProjectsProps = {
  projects: Array<ProjectProps>;
};

const Projects: FunctionComponent<ProjectsProps> = ({ projects }) => (
  <div id="projects">
    {projects.map((project, index) => (
      <ClientOnly key={index}>{() => <Project {...project} direction={index % 2 === 0 ? 'ltr' : 'rtl'} />}</ClientOnly>
    ))}
  </div>
);

export default Projects;
