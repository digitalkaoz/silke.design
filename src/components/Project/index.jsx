import React, { Component } from 'react';

import Flower from '../Flower';
import Icon from '../Icon';
// import Carousel from '../Carousel/Carousel';
import "./Project.scss";

const stripTags = html => {
  if (typeof window === 'undefined') {
    return html; // TODO wrong
  }

  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText;
};

class Project extends Component {
  renderDescription(dir){
    return <div className={dir}>
      <Flower {...this.props.skills} />
      <Icon
        src={`/img/${this.props.type}.svg`}
        name={`${this.id}_${this.props.type}_type`}
      />
      <div className="description">
        <h2 dangerouslySetInnerHTML={{ __html: this.props.name }} />
        <ul className="hide-on-small-only">
          {this.props.text.map((text, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
          ))}
        </ul>
      </div>
    </div>
  }

  getContainer() {
    return this.container.bind(this)
  }

  renderVisual(dir){
    return <div className={dir}>
      {/* <Carousel
        text={this.props.text}
        images={this.props.images}
        container={this.getContainer()}
      /> */}
    </div>
  }

  get id() {
    return (
      `project--${ 
      stripTags(this.props.name)
        .replace(/ /g, '_')
        .toLowerCase()}`
    );
  }

  render() {
    return (
        <div
          className={
            `project pin-top project--${  this.props.direction  } ${  this.id}`
          }
          id={this.id}
          ref={container => (this.container = container)}>
          {this.props.children}
          {this.renderDescription(
            this.props.direction === 'ltr' ? 'left' : 'right'
          )}
          {this.renderVisual(this.props.direction === 'ltr' ? 'right' : 'left')}
        </div>
    );
  }
}

export default Project;
