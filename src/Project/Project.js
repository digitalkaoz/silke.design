import React, { Component } from 'react';

import Flower from '../Flower/Flower';
import Icon from '../Icon/Icon';
import OverlayProject from './OverlayProject';
import LazyLoad from '../LazyLoad/LazyLoad';
import PushpinProject from './PushpinProject';
import Carousel from '../Carousel/Carousel';

class Project extends Component {
  renderDescription = dir => (
    <div className={dir}>
      <Flower {...this.props.skills} />
      <Icon
        src={`/img/${this.props.type}.svg`}
        name={`${this.id}_${this.props.type}_type`}
      />
      <div className="description">
        <h2>{this.props.name}</h2>
        <ul className="hide-on-small-only">
          {this.props.text.map((text, i) => <li key={i}>{text}</li>)}
        </ul>
      </div>
    </div>
  );

  getContainer = _ => this.container;

  renderVisual = dir => (
    <div className={dir}>
      <Carousel
        text={this.props.text}
        images={this.props.images}
        container={this.getContainer.bind(this)}
      />
    </div>
  );

  get id() {
    return 'project--' + this.props.name.replace(/ /g, '_').toLowerCase();
  }

  render() {
    return (
      <div
        className={
          'project pin-top project--' + this.props.direction + ' ' + this.id
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

export default OverlayProject(PushpinProject(LazyLoad(Project)));
