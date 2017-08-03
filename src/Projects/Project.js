import React, { Component } from 'react';

class Project extends Component {
  renderLeftContent() {
    if (this.props.direction === 'ltr') {
      return this.renderVisual();
    } else {
      return this.renderDescription();
    }
  }

  renderRightContent() {
    if (this.props.direction === 'ltr') {
      return this.renderDescription();
    } else {
      return this.renderVisual();
    }
  }

  renderDescription = () =>
    <p>
      {this.props.text}
    </p>;

  renderVisual = () =>
    <div>
      <p>
        {this.props.name}
      </p>
      <img alt="" src={this.props.logo} />
    </div>;

  render = () =>
    <div className="project row">
      <div className="col s12 m6">
        {this.renderLeftContent()}
      </div>
      <div className="col s12 m6">
        {this.renderRightContent()}
      </div>
    </div>;
}

export default Project;
