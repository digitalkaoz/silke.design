import React, { Component } from 'react';

import Icon from '../Icon/Icon';
import LazyLoad from '../LazyLoad/LazyLoad';

class Carousel extends Component {
  render = () => (
    <div className="carousel" ref={carousel => (this.carousel = carousel)}>
      {window.matchMedia && window.matchMedia('(max-width: 600px)').matches ? (
        <div className="carousel-item">{this.props.text}</div>
      ) : null}
      {this.props.images.map(img => (
        <div key={img} className="carousel-item" href="#one!">
          <img data-original={img} alt={this.props.name} />
        </div>
      ))}
    </div>
  );
}

export default Carousel;
