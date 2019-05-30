import React, { memo } from "react";

import Project, { ProjectProps } from "../Project";

import "./Projects.scss";

const getParameterByName = (name: string): boolean => {
  if (typeof window === "undefined") {
    return true;
  }
  const search = new URLSearchParams(window.location.search);

  return search.has(name);
};

export type ProjectsProps = {
  projects: Array<ProjectProps>;
};

const Projects = ({ projects }: ProjectsProps) => {
  const betaProjects = projects.filter(project => getParameterByName("beta"));
  const normalProjects = projects.filter(project => !project.beta);

  return (
    <div id="projects">
      {(getParameterByName("beta") ? betaProjects : normalProjects).map(
        (project, index) => (
          <Project
            key={project.name}
            direction={index % 2 === 0 ? "ltr" : "rtl"}
            {...project}
          />
        )
      )}
    </div>
  );
};

export default Projects;
