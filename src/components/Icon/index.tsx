import React, { PureComponent } from "react";
import { SimpleImg } from "react-simple-img";

//import { pure } from 'recompose';

export type IconProps = {
  src: string;
  name: string;
  target?: string;
};

class Icon extends PureComponent<IconProps, any> {
  renderLink() {
    return (
      <a
        href={this.props.target}
        target="_blank"
        rel="noopener noreferrer"
        className="icon"
      >
        {this.renderImage(false)}
      </a>
    );
  }

  renderImage(asIcon = true) {
    return (
      <SimpleImg
        src={this.props.src}
        placeholder="linear-gradient(rgba(0,0,0,0) 0%, rgb(0, 0, 0,1) 100%)"
        alt={this.props.name}
        className={asIcon ? "icon" : ""}
      />
    );
  }

  render() {
    return this.props.target ? this.renderLink() : this.renderImage();
  }
}

export default Icon;
