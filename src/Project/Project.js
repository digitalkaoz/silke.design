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
        src={
          this.props.type === 'mobile' ? '/img/phone.svg' : '/img/desktop.svg'
        }
        name={this.props.type}
      />
      <div className="description">
        <h2>{this.props.name}</h2>
        <p className="hide-on-small-only">{this.props.text}</p>
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

  render() {
    const id = 'project--' + this.props.name.replace(/ /g, '_').toLowerCase();

    return (
      <div
        className={
          'project pin-top project--' + this.props.direction + ' ' + id
        }
        id={id}
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
