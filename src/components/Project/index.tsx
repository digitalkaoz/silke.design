import { FunctionComponent, useState, memo } from 'react';

import './project.css';
import { toId } from '../../utils.js';
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
    link && link[0] && <a dangerouslySetInnerHTML={{ __html: link[0] }}></a>
  );

const Visual: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--gallery-column">
    <Carousel text={<Text {...props}></Text>} images={props.images} play={props.play || false} />
    <div className="links">
      <Link link={props.customer} />
      <Link link={props.employer} />
    </div>
  </div>
);

const Project: FunctionComponent<ProjectProps> = (props) => {
  const [playing /* setPlaying*/] = useState<boolean>(true);

  const project = useOnInView(
    (inView, entry) => {
      if (inView) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    },
    { threshold: 0.01 }
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
