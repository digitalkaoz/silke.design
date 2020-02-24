import React, {
  FunctionComponent,
  RefObject,
  useRef,
  useState,
  useEffect,
  memo
} from "react";
import Flower, { FlowerProps } from "../Flower";

import "./Project.scss";
import {
  toId,
  getParameterByName,
  Loading,
  Failed,
  getDistance
} from "../../utils";

import universal from "react-universal-component";
import { CarouselProps } from "../Carousel";

export type ProjectProps = {
  direction: "rtl" | "ltr";
  skills: FlowerProps;
  orientation: "landscape" | "portrait";
  type: string;
  name: string;
	task: string;
	solution: string;
	customer: Array<string>;
	employer?: Array<string>;
  images: Array<string>;
  beta?: boolean;
  play?: boolean;
};

const Carousel = universal(import("../Carousel"), {
  loading: Loading,
  error: Failed
}) as FunctionComponent<CarouselProps>;

const Text: FunctionComponent<ProjectProps> = ({
	task,
	solution,
	customer,
	employer
}) => (
	<>
			<h3>Aufgabe</h3>
      <p dangerouslySetInnerHTML={{ __html: task }}></p>
			<h3>Umsetzung</h3>
      <p dangerouslySetInnerHTML={{ __html: solution }}></p>
			<h3>Kunde</h3>
      {customer.length == 2 ? <p><a href={customer[1]} target="_blank" rel="nofollow" dangerouslySetInnerHTML={{ __html: customer[0] }}></a></p> : <p dangerouslySetInnerHTML={{ __html: customer[0] }}></p>}
      {employer && employer.length == 2 ? <p><a href={employer[1]} target="_blank" rel="nofollow" dangerouslySetInnerHTML={{ __html: employer[0] }}></a></p> : employer ? <p dangerouslySetInnerHTML={{ __html: employer[0] }}></p> : <></>}
	</>
)

const Description: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--description-column">
    <div className="heading">
      <Flower {...props.skills} />
      <h2 dangerouslySetInnerHTML={{ __html: props.name }} />
    </div>
    <div className="description hide-on-med-and-down">
			<Text {...props}></Text>
    </div>
  </div>
);

const Visual: FunctionComponent<ProjectProps> = (props) => (
  <div className="project--gallery-column">
    <Carousel text={<Text {...props}></Text>} images={props.images} play={props.play || false} />
  </div>
);

const Project: FunctionComponent<ProjectProps> = props => {
  const project: RefObject<HTMLDivElement> = useRef(null);
  const [playing /* setPlaying*/] = useState<boolean>(true);

  if (props.beta && !getParameterByName("beta")) {
    return <div style={{ display: "none" }}></div>;
  }

	//TODO https://github.com/thebuilder/react-intersection-observer ?
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (project.current) {
            project.current.style.filter = `grayscale(0) brightness(1)`;
          }
          window.addEventListener("scroll", fadeSticky);
        }
      });
    },
    {
      threshold: 0.01
    }
  );

  //TODO sideeffect
  const fade = (distance: number) => {
    window.requestAnimationFrame(() => {
      // if we react the top with the current active project, reset our own fading
      if (distance === 0) {
        project.current.style.filter = `grayscale(0) brightness(1)`;
      } else {
        project.current.style.filter = `grayscale(${1 -
          distance}) brightness(${distance})`;
      }
    });
  };

  const fadeSticky = () => {
    const distance = getDistance(project);

    // if we self are not on top always reset fading
    if (
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
  };

  useEffect(() => {
    observer.observe(project.current);

    return () => {
      window.removeEventListener("scroll", fadeSticky);
      observer.unobserve(project.current);
    };
  }, []);

  return (
    <div
      ref={project}
      className={`project project--${props.direction} project--${
        props.type
      } project--${toId(props.name)} ${
        props.type == "tablet"
          ? "project--" + (props.orientation || "landscape")
          : ""
      }`}
    >
      <Description {...props} />
      <Visual {...props} play={playing} />
    </div>
  );
};

export default memo(Project);
