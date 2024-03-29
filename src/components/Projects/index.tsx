import React, { FunctionComponent } from "react";

import Project, { ProjectProps } from "../Project";

import "./Projects.scss";

export type ProjectsProps = {
  projects: Array<ProjectProps>;
};

const Projects: FunctionComponent<ProjectsProps> = ({ projects }) => (
  <div id="projects">
    {projects.map((project, index) => (
      <Project key={index}
        direction={index % 2 === 0 ? "ltr" : "rtl"}
        {...project}
      />
    ))}
  </div>
);

export default Projects;
