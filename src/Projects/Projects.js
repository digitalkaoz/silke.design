import React from 'react';

import Project from './Project.js'

import projectConfig from './Projects.json';

const Projects = () =>
    <div id="projects">
        {projectConfig.map((project) => <Project key={project.name} {...project}></Project>)}
    </div>;

export default Projects;