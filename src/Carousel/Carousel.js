import React, { Component } from 'react';
import Siema from 'siema';
import Scrollmap from 'scrollmap';

import Icon from '../Icon/Icon';
import { passive, debounce } from '../client/utils';

class Carousel extends Component {
  automateCarousel = () => {
    if (this.props.container().classList.contains('pin-bottom')) {
      return clearInterval(this.timer);
    }
    Scrollmap.trigger(
      {
        target: this.carousel,
        surfaceVisible: 1
        //runOnScroll: true,
        //alwaysRunOnTrigger: true
      },
      element => {
        if (!this.timer) {
          this.timer = setInterval(this.slider.next.bind(this.slider), 5000);
        }
      }
    ).out(element => {
      clearInterval(this.timer);
    });
  };

  initializeCarousel = () => {
    //TODO lazy load stuff wont belong here
    [].forEach.call(this.carousel.querySelectorAll('[data-original]'), ll => {
      ll.src = ll.getAttribute('data-original');
    });

    this.slider = new Siema({
      selector: this.carousel,
      loop: true
    });

    this.carousel.setAttribute('data-carousel-loaded', true);

    window.addEventListener(
      'scroll',
      debounce(this.automateCarousel.bind(this), 50),
      passive
    );
  };

  componentDidMount() {
    this.initializeCarousel();
  }

  render = () => (
    <div className="carousel" ref={carousel => (this.carousel = carousel)}>
      {window.matchMedia && window.matchMedia('(max-width: 600px)').matches ? (
        <div className="carousel-item">{this.props.text}</div>
      ) : null}
      {this.props.images.map(img => (
        <div key={img} className="carousel-item" href="#one!">
          <img data-original={img} alt={this.props.name} />
          {/*<Icon src={img} alt={this.props.name} />*/}
        </div>
      ))}
    </div>
  );
}

export default Carousel;
