import {
  FunctionComponent,
  RefObject,
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react';

import './project.css';
import { toId, getParameterByName, getDistance } from '../../utils.js';
import Carousel from '../Carousel';

export type ProjectProps = {
  direction: 'rtl' | 'ltr';
  orientation: 'landscape' | 'portrait';
  type: string;
  name: string;
  task: string;
  role?: string;
  solution: string;
  customer: Array<string>;
  employer?: Array<string>;
  images: Array<string>;
  beta?: boolean;
  play?: boolean;
};

const Text: FunctionComponent<ProjectProps> = ({ task, solution, customer, employer, role }) => (
  <>
    <h3>Task</h3>
    <p dangerouslySetInnerHTML={{ __html: task }}></p>
    <h3>Role</h3>
    {role && <p dangerouslySetInnerHTML={{ __html: role }}></p>}
    <h3>Outcome</h3>
    <p dangerouslySetInnerHTML={{ __html: solution }}></p>
    {customer.length == 2 ? (
      <a
        href={customer[1]}
        target="_blank"
        rel="nofollow"
        dangerouslySetInnerHTML={{ __html: customer[0] }}
      ></a>
    ) : (
      <p dangerouslySetInnerHTML={{ __html: customer[0] }}></p>
    )}
    {employer?.length == 2 ? (
      <a
        href={employer[1]}
        target="_blank"
        rel="nofollow"
        dangerouslySetInnerHTML={{ __html: employer[0] }}
      ></a>
    ) : employer ? (
      <p dangerouslySetInnerHTML={{ __html: employer[0] }}></p>
    ) : (
      <></>
    )}
  </>
);

const Description: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--description-column">
    <div className="heading">
      <h2 dangerouslySetInnerHTML={{ __html: props.name }} />
    </div>
    <div className="description">
      <Text {...props}></Text>
    </div>
  </div>
);

const Visual: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--gallery-column">
    <Carousel text={<Text {...props}></Text>} images={props.images} play={props.play || false} />
  </div>
);

const Project: FunctionComponent<ProjectProps> = (props) => {
  const project: RefObject<HTMLDivElement> = useRef(null);
  const [playing /* setPlaying*/] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver>(null);

  const fade = useCallback((distance: number) => {
    window.requestAnimationFrame(() => {
      if (!project.current) {
        return;
      }
      // if we react the top with the current active project, reset our own fading
      if (distance === 0) {
        project.current.style.filter = `grayscale(0) brightness(1)`;
      } else {
        project.current.style.filter = `grayscale(${1 - distance}) brightness(${distance})`;
      }
    });
  }, []);

  const fadeSticky = useCallback(() => {
    const distance = getDistance(project);

    // if we self are not on top always reset fading
    if (
      project.current &&
      project.current.getBoundingClientRect().top / window.innerHeight > 0 &&
      project.current.style.filter != `grayscale(0) brightness(1)`
    ) {
      fade(0);
    } else {
      fade(distance);
    }

    if (distance >= 0.7 && playing === false) {
      //setPlaying(true);
    } else if (playing === true && distance < 0.7) {
      //setPlaying(false);
    }
  }, [fade, playing]);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (project.current) {
                project.current.style.filter = `grayscale(0) brightness(1)`;
              }
              window.addEventListener('scroll', fadeSticky);
            }
          });
        },
        {
          threshold: 0.01,
        }
      );
    }

    const currentProject = project.current;
    const currentObserver = observerRef.current;

    if (currentProject && currentObserver) {
      currentObserver.observe(currentProject);
    }

    return () => {
      window.removeEventListener('scroll', fadeSticky);
      if (currentProject && currentObserver) {
        currentObserver.unobserve(currentProject);
      }
    };
  }, [fadeSticky]);

  if (props.beta && !getParameterByName('beta')) {
    return <div style={{ display: 'none' }}></div>;
  }

  return (
    <div
      ref={project}
      className={`project project--${props.direction} project--${
        props.type
      } project--${toId(props.name)} ${
        props.type == 'tablet' ? 'project--' + (props.orientation || 'landscape') : ''
      }`}
    >
      <Description {...props} />
      <Visual {...props} play={playing} />
    </div>
  );
};

export default memo(Project);
