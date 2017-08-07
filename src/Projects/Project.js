import React, { Component } from 'react';

import Flower from '../Flower/Flower';

class Project extends Component {
  renderDescription = dir =>
    <div className={dir}>
      <Flower {...this.props.skills} />
      <div className="description">
        <h2>
          {this.props.name}
        </h2>
        <p>
          {this.props.text}
        </p>
      </div>
    </div>;

  renderVisual = dir =>
    <div className={dir}>
      <div className="carousel">
        <div className="carousel-item" href="#one!">
          <h2>First Panel</h2>
          <p className="white-text">This is your first panel</p>
        </div>
        <div className="carousel-item" href="#two!">
          <h2>Second Panel</h2>
          <p className="white-text">This is your second panel</p>
        </div>
        <div className="carousel-item" href="#three!">
          <h2>Third Panel</h2>
          <p className="white-text">This is your third panel</p>
        </div>
        <div className="carousel-item" href="#four!">
          <h2>Fourth Panel</h2>
          <p className="white-text">This is your fourth panel</p>
        </div>
      </div>
      <p>
        {this.props.year}
      </p>
    </div>;

  render = () =>
    <div
      className={
        'project project--' + this.props.name.replace(/ /g, '_').toLowerCase()
      }
    >
      {this.renderDescription(
        this.props.direction === 'ltr' ? 'left' : 'right'
      )}
      {this.renderVisual(this.props.direction === 'ltr' ? 'right' : 'left')}
    </div>;
}

export default Project;
