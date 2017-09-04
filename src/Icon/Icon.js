import React, { Component } from 'react';

class Icon extends Component {
  renderLink = () => (
    <a
      href={this.props.target}
      name={this.props.name}
      target="_blank"
      rel="noopener"
      className="icon">
      <img data-original={this.props.src} alt={this.props.name} />
    </a>
  );

  renderImage = () => (
    <img
      data-original={this.props.src}
      alt={this.props.name}
      className="icon"
    />
  );

  render = () => (this.props.target ? this.renderLink() : this.renderImage());
}

export default Icon;
