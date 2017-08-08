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
        {this.props.images.map(img =>
          <div key={img} className="carousel-item" href="#one!">
            <img data-original={img} alt={this.props.name} />
          </div>
        )}
      </div>
    </div>;

  render = () =>
    <div
      className={
        'project project--' +
        this.props.direction +
        ' project--' +
        this.props.name.replace(/ /g, '_').toLowerCase()
      }>
      {this.renderDescription(
        this.props.direction === 'ltr' ? 'left' : 'right'
      )}
      {this.renderVisual(this.props.direction === 'ltr' ? 'right' : 'left')}
    </div>;
}

export default Project;
