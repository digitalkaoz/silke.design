import React, {
  FunctionComponent,
  RefObject,
  useRef,
  useState,
  useCallback
} from "react";
import Sticky from "react-stickynode";
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
  const stickyContainer: RefObject<Sticky> = useRef(null);
  const project: RefObject<HTMLDivElement> = useRef(null);
  const [playing, setPlaying] = useState(true);
  let listenerAttached = false;

  if (props.beta && !getParameterByName("beta")) {
    return <div style={{ display: "none" }}></div>;
  }

  //TODO sideeffect
  const fade = (distance: number) => {
    window.requestAnimationFrame(() => {
      if (project.current) {
        project.current.style.filter = `grayscale(${1 - distance}) brightness(${distance})`
      }
    });
  };

  const fadeSticky = () => {
    const distance = getDistance(stickyContainer);

    fade(distance);
    setPlaying(false);

    if (distance >= 0.7 && playing === false) {
      setPlaying(true);
    }
  };

  const stickyChanged = useCallback(
    ({ status }: Sticky.Status) => {
      if (typeof window === "undefined" || listenerAttached) {
        return;
      }

      if (status === Sticky.STATUS_FIXED) {
        window.addEventListener("scroll", fadeSticky, { passive: true });
        listenerAttached = true;
      } else {
        window.removeEventListener("scroll", fadeSticky);
        listenerAttached = false;
        if (stickyContainer && (stickyContainer.current as any).outerElement) {
          fade(1);
        }

        setPlaying(true);
      }
    }, []
  );

  return (
    <Sticky onStateChange={stickyChanged} ref={stickyContainer}>
      <div
        ref={project}
        className={`project project--${props.direction} project--${
          props.type
        } project--${toId(props.name)} ${props.type == "tablet" ? "project--"+(props.orientation || "landscape") : ""}`}
      >
        <Description
          {...props}
        />
        <Visual
          {...props}
          play={playing}
        />
      </div>
    </Sticky>
  );
};

export default Project;
