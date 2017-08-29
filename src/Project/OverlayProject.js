import React, { Component } from 'react';

import { passiveListeners } from '../client/utils';

export default Project => {
  return class OverlayProject extends Component {
    process() {
      if (!this.container.classList.contains('pinned')) {
        return false;
      }

      if (this.shouldIncrease()) {
        this.increaseOpacity(this.container);
      } else {
        this.setOpacity(0);
      }
    }

    shouldIncrease() {
      const parentNode = this.container.parentNode;

      return (
        parentNode.nextSibling &&
        Math.abs(parentNode.getBoundingClientRect().top) <
          parentNode.offsetHeight
      );
    }

    increaseOpacity() {
      const parentNode = this.container.parentNode;
      const opacity = Math.abs(
        parentNode.getBoundingClientRect().top / parentNode.offsetHeight
      );

      this.setOpacity(opacity);
    }

    setOpacity(opacity) {
      requestAnimationFrame(() => (this.overlay.style.opacity = opacity));
    }

    componentDidMount() {
      window.addEventListener(
        'scroll',
        this.process.bind(this),
        passiveListeners()
      );
    }

    render = () => (
      <div className="project-wrapper">
        <Project
          {...this.props}
          ref={component => {
            this.container = component.container;
            this.carousel = component.carousel;
          }}>
          <div ref={overlay => (this.overlay = overlay)} className="overlay" />
        </Project>
      </div>
    );
  };
};
