import React, { Component } from 'react';
import Siema from 'siema';
import Scrollmap from 'scrollmap';

import Flower from '../Flower/Flower';
import Icon from '../Icon/Icon';
import { passiveListeners } from '../client/utils';

class Project extends Component {
  automateCarousel = () => {
    if (this.refs.container.classList.contains('pinned')) {
      clearInterval(this.timer);
    } else {
      Scrollmap.trigger(
        {
          target: this.refs.carousel,
          surfaceVisible: 1
          //runOnScroll: true,
          //alwaysRunOnTrigger: true
        },
        element => {
          if (!this.timer) {
            this.timer = setInterval(
              this.carousel.next.bind(this.carousel),
              5000
            );
          }
        }
      ).out(element => {
        if (this.timer) {
          clearInterval(this.timer);
        }
      });
    }
  };

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
      <div className="carousel" ref="carousel">
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

  initializeCarousel = () => {
    this.carousel = new Siema({
      selector: this.refs.carousel,
      loop: true
    });

    if (window.matchMedia && window.matchMedia('(min-width: 601px)').matches) {
      window.addEventListener(
        'scroll',
        this.automateCarousel.bind(this),
        passiveListeners()
      );
    }
  };

  componentDidMount() {
    if (this.props.images.length > 1) {
      this.initializeCarousel();
    }
  }

  render() {
    const id = 'project--' + this.props.name.replace(/ /g, '_').toLowerCase();

    return (
      <div className="project-wrapper">
        <div
          className={'project project--' + this.props.direction + ' ' + id}
          id={id}
          ref="container">
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
