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
  text: Array<string>;
  images: Array<string>;
  beta?: boolean;
  play?: boolean;
};

const Carousel = universal(import("../Carousel"), {
  loading: Loading,
  error: Failed
}) as FunctionComponent<CarouselProps>;

const Description: FunctionComponent<ProjectProps> = ({
  skills,
  name,
  text
}) => (
  <div className="project--description-column">
    <div className="heading">
      <Flower {...skills} />
      <h2 dangerouslySetInnerHTML={{ __html: name }} />
    </div>
    <div className="description">
      <p dangerouslySetInnerHTML={{ __html: text[0] }}></p>
      <ul className="hide-on-small-only">
        {text.slice(1).map((text, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
        ))}
      </ul>
    </div>
  </div>
);

const Visual: FunctionComponent<ProjectProps> = ({
  text,
  images,
  play = false
}) => (
  <div className="project--gallery-column">
    <Carousel text={text} images={images} play={play} />
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
