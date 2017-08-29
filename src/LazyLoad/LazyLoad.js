import React, { Component } from 'react';
import LazyLoad from 'vanilla-lazyload';

export default WrappedComponent => {
  return class LazyLoadComponent extends Component {
    componentDidMount() {
      new LazyLoad({
        container: this.container
      });
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
