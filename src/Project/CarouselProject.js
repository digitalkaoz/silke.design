import React, { Component } from 'react';
import Siema from 'siema';
import Scrollmap from 'scrollmap';

import { passive } from '../client/utils';

export default Project => {
  return class CarouselProject extends Component {
    automateCarousel = () => {
      if (this.container.classList.contains('pinned')) {
        clearInterval(this.timer);
      } else {
        Scrollmap.trigger(
          {
            target: this.carousel,
            surfaceVisible: 1
            //runOnScroll: true,
            //alwaysRunOnTrigger: true
          },
          element => {
            if (!this.timer) {
              this.timer = setInterval(
                this.slider.next.bind(this.slider),
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

    initializeCarousel = () => {
      this.slider = new Siema({
        selector: this.carousel,
        loop: true
      });

      if (
        window.matchMedia &&
        window.matchMedia('(min-width: 601px)').matches
      ) {
        window.addEventListener(
          'scroll',
          this.automateCarousel.bind(this),
          passive
        );
      }
    };

    componentDidMount() {
      if (this.props.images.length > 1) {
        this.initializeCarousel();
      }
    }

    render = () => (
      <Project
        {...this.props}
        ref={component => {
          this.container = component.container;
          this.carousel = component.carousel;
        }}>
        {this.props.children}
      </Project>
    );
  };
};
