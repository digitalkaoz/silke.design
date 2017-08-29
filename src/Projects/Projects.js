import React from 'react';

import Project from '../Project/Project.js';
import projectConfig from './Projects.json';
import { getParameterByName } from '../client/utils';

const Projects = () => (
  <div id="projects">
    {projectConfig
      .filter(project => {
        return !project.hasOwnProperty('beta') || getParameterByName('beta');
      })
      .map(project => <Project key={project.name} {...project} />)}
  </div>
);

export default Projects;
