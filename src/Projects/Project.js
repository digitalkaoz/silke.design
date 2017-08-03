import React, { Component } from 'react';

import Flower from '../Flower/Flower';

class Project extends Component {
  renderDescription = dir =>
    <div className={dir}>
      <Flower {...this.props.skills} />
      <h2>
        {this.props.name}
      </h2>
      <p>
        {this.props.text}
      </p>
    </div>;

  renderVisual = dir =>
    <div className={dir}>
      <img alt="" src={this.props.logo} />
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
      {this.renderVisual(this.props.direction === 'ltr' ? 'right' : 'left')}
      {this.renderDescription(
        this.props.direction === 'ltr' ? 'left' : 'right'
      )}
    </div>;
}

export default Project;
