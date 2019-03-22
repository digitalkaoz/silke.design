import React, { PureComponent, memo } from "react";
import Sticky from "react-stickynode";
import Flower, { FlowerProps } from "../Flower";
import Icon from "../Icon";
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

  constructor(props:ProjectProps) {
    super(props);

    this.handleStickyChange = this.handleStickyChange.bind(this);
    this.fadeSticky = this.fadeSticky.bind(this);

    this.container = React.createRef();
    this.state = {sticky:false, play: true}
  }
  
  renderDescription(dir: string) {
    return (
      <div className={dir}>
        <div>
          <Flower {...this.props.skills} />
          <Icon
            src={`/img/${this.props.type}.svg`}
            name={`${this.getId()}_${this.props.type}_type`}
          />
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
      return 100
    }
    const self:HTMLDivElement = (this.container.current as any).outerElement 

    if (!self.nextSibling) {
      return 100;
    }

    return (self.nextSibling as HTMLDivElement).getBoundingClientRect().top / window.innerHeight;
  }

  private fadeSticky() {
    if (this.container.current && (this.container.current as any).outerElement ) {
      const self:HTMLDivElement = (this.container.current as any).outerElement 
      const distance = this.getDistance();
      self.style.opacity = distance.toString();

      if (distance <= 0.5 && this.state.play === true) {
        this.setState({play: false});
      }

      if (distance >= 0.5 && this.state.play === false) {
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
        const self:HTMLDivElement = (this.container.current as any).outerElement 
        self.style.opacity = "1";
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
    return (
      <Sticky onStateChange={this.handleStickyChange} ref={this.container}>
        <div className={`project project--${this.props.direction} ${this.getId()}`}>
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
