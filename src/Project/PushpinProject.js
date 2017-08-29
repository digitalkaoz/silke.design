import React, { Component } from 'react';

import Scrollmap from 'scrollmap';

//TODO refactor jquery away!
const $ = (window.jQuery = require('jquery'));

window.Vel = require('materialize-css/js/velocity.min');
require('materialize-css/js/global');
require('materialize-css/js/pushpin');

export default Project => {
  return class PushpinProject extends Component {
    addPushpin() {
      this.container.parentNode.setAttribute(
        'style',
        `height: ${this.container.offsetHeight}px`
      );

      const rect = this.container.parentNode.getBoundingClientRect();

      const top = rect.top + document.documentElement.scrollTop;
      const bottom = top + this.container.offsetHeight;

      $(this.container).pushpin({
        top: top,
        bottom: bottom
      });
    }

    componentDidMount() {
      Scrollmap.trigger(
        {
          target: this.container,
          surfaceVisible: 0
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
