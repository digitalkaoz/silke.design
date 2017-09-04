import React, { Component } from 'react';
import Scrollmap from 'scrollmap';

import pushpin from '../client/Pushpin';
import { scrollTop } from '../client/utils';

export default Project => {
  return class PushpinProject extends Component {
    addPushpin() {
      let rect = this.container.getBoundingClientRect();
      let topOffset = rect.top + scrollTop();
      let bottomOffset = topOffset + this.container.offsetHeight;

      pushpin(this.container, {
        top: topOffset,
        bottom: bottomOffset
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
