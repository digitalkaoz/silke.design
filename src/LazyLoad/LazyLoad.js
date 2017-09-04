import React, { Component } from 'react';

import Scrollmap from 'scrollmap';

export default WrappedComponent => {
  return class LazyLoadComponent extends Component {
    componentDidMount() {
      Scrollmap.trigger(
        {
          target: this.container,
          surfaceVisible: 0,
          treshold: -100
        },
        element => {
          window.requestAnimationFrame(_ => {
            [].forEach.call(
              this.container.querySelectorAll('[data-original]'),
              ll => {
                if ('SOURCE' === ll.nodeName) {
                  ll.srcset = ll.getAttribute('data-original');
                } else {
                  ll.src = ll.getAttribute('data-original');
                }
              }
            );
          });
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
