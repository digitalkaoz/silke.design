import React, {memo} from 'react';

import Project, {ProjectProps} from '../Project';

import "./Projects.scss";

const getParameterByName = (name:string): boolean => {
  if (typeof window === 'undefined') {return false};
  const search = new URLSearchParams(window.location.search);

  return search.has(name);
};

export type ProjectsProps = {
  projects: Array<ProjectProps>
}

const Projects = ({projects}: ProjectsProps) => (
  <div id="projects">
    {projects
      .filter(project => !project.beta || getParameterByName('beta'))
      .map(project => <Project key={project.name} {...project} />)}
  </div>
);

export default Projects;
