import React, { Component } from 'react';
import {SimpleImg} from "react-simple-img";

class Icon extends Component {

  renderLink(){
    return <a
      href={this.props.target}
      name={this.props.name}
      target="_blank"
      rel="noopener noreferrer"
      className="icon">
      {this.renderImage(false)}
    </a>
  };

  renderImage(asIcon=true) {
    return <SimpleImg
      src={this.props.src}
      placeholder="linear-gradient(rgba(0,0,0,0) 0%, rgb(0, 0, 0,1) 100%)"
      alt={this.props.name}
      className={asIcon ? "icon": ""}
    />
  }

  render(){ 
    return this.props.target ? this.renderLink() : this.renderImage()
  };
}

export default Icon;
