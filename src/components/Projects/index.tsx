import { FunctionComponent, useEffect, useRef } from 'react';

import Project, { ProjectProps } from '../Project';

import './projects.css';
import { getDistance } from '../../utils';

export type ProjectsProps = {
  projects: Array<ProjectProps>;
};

function fadySticky() {
  let currentProject: HTMLElement | undefined;
  let previousProject: HTMLElement | undefined;
  this.childNodes.forEach((project: HTMLElement, index) => {
    // we dont handle first element or process further when we found the current project (the one thats not yet sticky)
    if (currentProject || index == 0) {
      return;
    }
    // handle last element when all items have "in-view"
    if (index === this.childNodes.length - 1 && project.classList.contains('in-view')) {
      currentProject = project;
      previousProject = currentProject.previousSibling as HTMLElement;
      return;
    }

    // the first item without "in-view" class
    if (!project.classList.contains('in-view')) {
      currentProject = project.previousSibling as HTMLElement;
      previousProject = currentProject.previousSibling as HTMLElement;
      return;
    }
  });

  if (!currentProject) {
    return;
  }

  if (previousProject) {
    window.requestAnimationFrame(() => {
      // fade out the previous one based on the height of the current one
      const top = getDistance(currentProject);
      const distance = parseFloat(top) / window.innerHeight;
      if (distance > 0.1) {
        previousProject.style.filter = `grayscale(${1 - distance}) brightness(${distance})`;
      }
    });
  }
}

const Projects: FunctionComponent<ProjectsProps> = ({ projects }) => {
  const scroller = useRef<HTMLElement>(undefined);

  useEffect(() => {
    const el = scroller.current;
    if (!el) {
      return;
    }
    const cb = fadySticky.bind(el);
    window.addEventListener('scroll', cb, {
      passive: true,
    });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  return (
    <div id="projects" ref={scroller}>
      {projects.map((project, index) => (
        <Project key={index} {...project} direction={index % 2 === 0 ? 'ltr' : 'rtl'} />
      ))}
    </div>
  );
};

export default Projects;
