import React, { PureComponent, memo } from "react";
import Sticky from "react-stickynode";
import Flower, { FlowerProps } from "../Flower";
import Icon from "../Icon";
import "./Project.scss";

import universal from "react-universal-component";
import { SSL_OP_NO_TICKET } from "constants";

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
  constructor(props:ProjectProps) {
    super(props);

    this.handleStickyChange = this.handleStickyChange.bind(this);
    this.state = {sticky:false}
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

  private handleStickyChange({status}:any) {
    this.setState({sticky:status})
  }

  private renderVisual(dir: string) {
    return (
      <div className={dir}>
        <Carousel text={this.props.text} images={this.props.images} play={this.state.sticky === Sticky.STATUS_ORIGINAL || this.state.sticky === Sticky.STATUS_RELEASED} />
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
      <Sticky onStateChange={this.handleStickyChange}>
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
