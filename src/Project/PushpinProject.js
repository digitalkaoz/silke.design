import React, { Component } from 'react';
import Scrollmap from 'scrollmap';

import pushpin from '../client/Pushpin';

export default Project => {
  return class PushpinProject extends Component {
    addPushpin() {
      const rect = this.container.getBoundingClientRect();
      const top = rect.top + document.documentElement.scrollTop;
      const bottom = top + this.container.offsetHeight;

      pushpin(this.container, {
        top: top,
        bottom: bottom
      });
    }

    componentDidMount() {
      Scrollmap.trigger(
        {
          target: this.container,
          surfaceVisible: 0,
          treshold: 100
          //runOnScroll: true,
          //alwaysRunOnTrigger: true
        },
        this.addPushpin.bind(this)
      );
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
