import React, { Component } from 'react';

import { passive } from '../client/utils';

export default Project => {
  return class OverlayProject extends Component {
    process() {
      if (!this.container.classList.contains('pinned')) {
        this.container.parentNode.style.filter = undefined;
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
      requestAnimationFrame(
        () =>
          (this.container.parentNode.style.filter = `blur(${opacity}px) brightness(${1 -
            opacity})`)
      );
    }

    componentDidMount() {
      window.addEventListener('scroll', this.process.bind(this), passive);
    }

    render = () => (
      <Project
        {...this.props}
        ref={component => {
          this.container = component.container;
          this.carousel = component.carousel;
        }}
      />
    );
  };
};
