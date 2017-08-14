import React from 'react';

import Project from './Project.js';

import projectConfig from './Projects.json';

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const Projects = () =>
  <div id="projects">
    {projectConfig
      .filter(project => {
        return !project.hasOwnProperty('beta') || getParameterByName('beta');
      })
      .map(project => <Project key={project.name} {...project} />)}
  </div>;

export default Projects;
