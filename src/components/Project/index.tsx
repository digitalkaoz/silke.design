import React, { PureComponent } from "react";
import Sticky from "react-stickynode";
import Flower, { FlowerProps } from "../Flower";
import { debounce } from 'lodash';

import "./Project.scss";

import universal from "react-universal-component";

type UniversalContext = {
  error?: string;
};

const Failed = (context: UniversalContext): any =>
  (context.error && console.error(context.error)) || <span />;

const Loading = (): any => <span />;

const Carousel = universal(import("../Carousel"), {
  loading: Loading,
  error: Failed
}) as any; //TODO rly?

const stripTags = (html: string): string => {
  if (typeof window === "undefined") {
    return html.replace(/(<([^>]+)>)/ig,"");
  }

  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText;
};

const getParameterByName = (name: string): boolean => {
  if (typeof window === "undefined") {
    return true;
  }
  const search = new URLSearchParams(window.location.search);

  return search.has(name);
};


export type ProjectProps = {
  direction: "rtl" | "ltr";
  skills: FlowerProps;
  type: string;
  name: string;
  text: Array<string>;
  images: Array<string>;
  beta?: boolean;
};

class Project extends PureComponent<ProjectProps, any> {

  private container:React.RefObject<Sticky>;
  private project:React.RefObject<HTMLDivElement>;

  constructor(props:ProjectProps) {
    super(props);

    this.handleStickyChange = this.handleStickyChange.bind(this);
    this.fadeSticky = this.fadeSticky.bind(this);
    this.fade = debounce(this.fade.bind(this), 10);

    this.container = React.createRef();
    this.project = React.createRef();
    this.state = {sticky:false, play: true}
  }
  
  private fade(distance:number) {
    const self:HTMLDivElement = (this.container.current as any).outerElement;

    self.style.opacity = distance.toString();
    if (this.project.current) {
      this.project.current.style.filter = `blur(${3-(distance*3)}px)`;
    }
  }

  renderDescription(dir: string) {
    return (
      <div className={dir}>
        <div>
          <Flower {...this.props.skills} />
          <div className="description">
            <h2 dangerouslySetInnerHTML={{ __html: this.props.name }} />
            <p dangerouslySetInnerHTML={{ __html: this.props.text[0] }}></p>
            <ul className="hide-on-small-only">
              {this.props.text.slice(1).map((text, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  private getDistance() : number {
    if (!this.container.current) {
      return 0
    }
    const self:HTMLDivElement = (this.container.current as any).outerElement 

    if (!self.nextSibling) {
      return 0;
    }

    return (self.nextSibling as HTMLDivElement).getBoundingClientRect().top / window.innerHeight;
  }

  private fadeSticky() {
    if (this.container.current && (this.container.current as any).outerElement ) {
      const distance = this.getDistance();

      this.fade(distance);
      this.setState({play: false});

      if (distance >= 0.7 && this.state.play === false) {
        this.setState({play: true});
      }
    }
  }

  private handleStickyChange({status}:any) {
    this.setState({sticky:status});

    if (status === Sticky.STATUS_FIXED && typeof window !== "undefined") {
      window.addEventListener('scroll', this.fadeSticky, {passive: true});
    } else {
      window.removeEventListener("scroll", this.fadeSticky);
      if (this.container.current && (this.container.current as any).outerElement ) {
        this.fade(1);
      }
      this.setState({play: true});
    }
  }

  private renderVisual(dir: string) {
    return (
      <div className={dir}>
        <Carousel text={this.props.text} images={this.props.images} play={this.state.play} />
      </div>
    );
  }

  private getId(): string {
    return `project--${stripTags(this.props.name)
      .replace(/ /g, "_")
      .toLowerCase()}`;
  }

  render() {
    if (this.props.beta && !getParameterByName('beta')) {
      return <div style={{display: "none"}}></div>;
    }

    return (
      <Sticky onStateChange={this.handleStickyChange} ref={this.container}>
        <div ref={this.project} className={`project project--${this.props.direction} project--${this.props.type} ${this.getId()}`}>
          {this.renderDescription(
            this.props.direction === "ltr" ? "project--left" : "project--right"
          )}
          {this.renderVisual(
            this.props.direction === "ltr" ? "project--right" : "project--left"
          )}
        </div>
      </Sticky>
    );
  }
}

export default Project;
