import { FunctionComponent, useState, memo } from 'react';

import './project.css';
import { toId, getDistance } from '../../utils.js';
import Carousel from '../Carousel';
import { useOnInView } from 'react-intersection-observer';

export type ProjectProps = {
  direction: 'rtl' | 'ltr';
  orientation: 'landscape' | 'portrait';
  type: string;
  name: string;
  task: string;
  role?: Array<string>;
  solution: string;
  customer: Array<string>;
  employer?: Array<string>;
  timeframe?: string;
  images: Array<string>;
  beta?: boolean;
  play?: boolean;
};

function fadySticky() {
  const target = this.target as HTMLElement;
  const distance = getDistance(this.target);
  if (distance === 0) {
    if (target.style.filter != `grayscale(0) brightness(1)`) {
      //console.log('changing visibility for', target)
      target.style.filter = `grayscale(0) brightness(1)`;
    }
  } else if (distance < 1) {
    //console.log('changing visibility for', target, distance)
    target.style.filter = `grayscale(${1 - distance}) brightness(${distance})`;
  }
}

const Text: FunctionComponent<ProjectProps> = ({
  task,
  solution,
  customer,
  employer,
  role,
  timeframe,
}) => (
  <>
    {timeframe && <p className="time">{timeframe}</p>}
    <h3>Task</h3>
    <p dangerouslySetInnerHTML={{ __html: task }}></p>
    <h3>Responsibilities</h3>
    {role && role.length && (
      <ul>
        {role.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    )}
    <h3>Outcome</h3>
    <p dangerouslySetInnerHTML={{ __html: solution }}></p>
    <Link link={customer} />
    <Link link={employer} />
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

const Link: FunctionComponent<{ link: Array<string> | string | undefined }> = ({ link }) =>
  link && link.length == 2 ? (
    <a
      href={link[1]}
      target="_blank"
      rel="nofollow"
      dangerouslySetInnerHTML={{ __html: link[0] }}
    ></a>
  ) : (
    link && link[0] && <p dangerouslySetInnerHTML={{ __html: link[0] }}></p>
  );

const Visual: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--gallery-column">
    <Carousel text={<Text {...props}></Text>} images={props.images} play={props.play || false} />
    <p>
      <Link link={props.customer} />
      <Link link={props.employer} />
    </p>
  </div>
);

const Project: FunctionComponent<ProjectProps> = (props) => {
  const [playing /* setPlaying*/] = useState<boolean>(true);

  const project = useOnInView(
    (inView, entry) => {
      /*if (!window) {
        return
      }
      const cb = fadySticky.bind(entry);
      if (inView) {
        window.addEventListener('scroll', cb);
      } else {
        window.removeEventListener('scroll', cb);
        (entry.target as HTMLElement).style.filter = `grayscale(0) brightness(1)`;
      }*/
    },
    { threshold: 0.1, delay: 100, trackVisibility: true }
  );

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
