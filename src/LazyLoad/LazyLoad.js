import React, { Component } from 'react';

import Scrollmap from 'scrollmap';

export default WrappedComponent => {
  return class LazyLoadComponent extends Component {
    componentDidMount() {
      Scrollmap.trigger(
        {
          target: this.container,
          surfaceVisible: 0,
          treshold: -300
          //runOnScroll: true,
          //alwaysRunOnTrigger: true
        },
        element => {
          [].forEach.call(
            this.container.querySelectorAll('[data-original]'),
            ll => {
              ll.src = ll.getAttribute('data-original');
            }
          );
        }
      );
    }

    render = () => (
      <WrappedComponent
        {...this.props}
        ref={component => {
          this.container = component.container;
          this.carousel = component.carousel;
        }}>
        {this.props.children}
      </WrappedComponent>
    );
  };
};
