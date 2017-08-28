import React, { Component } from 'react';

import Flower from '../Flower/Flower';
import Icon from '../Icon/Icon';

class Project extends Component {
  renderDescription = dir =>
    <div className={dir}>
      <Flower {...this.props.skills} />
      <Icon
        src={
          this.props.type === 'mobile' ? '/img/phone.svg' : '/img/desktop.svg'
        }
        name={this.props.type}
      />
      <div className="description">
        <h2>
          {this.props.name}
        </h2>
        <p className="hide-on-small-only">
          {this.props.text}
        </p>
      </div>
    </div>;

  renderVisual = dir =>
    <div className={dir}>
      <div className="carousel">
        {window.matchMedia && window.matchMedia('(max-width: 600px)').matches
          ? <div className="carousel-item">
              {this.props.text}
            </div>
          : null}
        {this.props.images.map(img =>
          <div key={img} className="carousel-item" href="#one!">
            <img data-original={img} alt={this.props.name} />
          </div>
        )}
      </div>
    </div>;

  render() {
    const id = 'project--' + this.props.name.replace(/ /g, '_').toLowerCase();

    return (
      <div className="project-wrapper">
        <div
          className={'project project--' + this.props.direction + ' ' + id}
          id={id}>
          <div className="overlay" />
          {this.renderDescription(
            this.props.direction === 'ltr' ? 'left' : 'right'
          )}
          {this.renderVisual(this.props.direction === 'ltr' ? 'right' : 'left')}
        </div>
      </div>
    );
  }
}

export default Project;
