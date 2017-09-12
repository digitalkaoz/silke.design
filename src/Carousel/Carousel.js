import React, { Component } from 'react';
import Siema from 'siema';
import Scrollmap from 'scrollmap';

//import Icon from '../Icon/Icon';
import { passive, debounce } from '../client/utils';

class Carousel extends Component {
  automateCarousel = () => {
    if (this.props.container().classList.contains('pin-bottom')) {
      return clearInterval(this.timer);
    }
    if (this.totalSlides() <= 1) {
      return;
    }

    Scrollmap.trigger(
      {
        target: this.carousel,
        surfaceVisible: 0.8,
        //runOnScroll: true,
        alwaysRunOnTrigger: true
      },
      element => {
        if (!this.timer) {
          this.timer = setInterval(this.slider.next.bind(this.slider), 6000);
        }
      }
    ).out(element => {
      this.slider.goTo(0);
      clearInterval(this.timer);
    });
  };

  restartTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.slider && this.totalSlides() > 1) {
      this.timer = setInterval(this.slider.next.bind(this.slider), 6000);
    }
  };

  initializeCarousel = () => {
    //TODO lazy load stuff wont belong here
    [].forEach.call(this.carousel.querySelectorAll('[data-original]'), ll => {
      ll.src = ll.getAttribute('data-original');
    });

    this.slider = new Siema({
      selector: this.carousel,
      loop: true,
      startIndex: 1,
      onInit: this.updateIndicator.bind(this),
      onChange: this.updateIndicator.bind(this)
    });

    this.carousel.setAttribute('data-carousel-loaded', true);

    window.addEventListener(
      'scroll',
      debounce(this.automateCarousel.bind(this), 50),
      passive
    );
  };

  totalSlides = () =>
    this.carousel.parentNode.querySelectorAll('.carousel-indicator a').length;

  updateIndicator() {
    if (this.totalSlides() <= 1) {
      return;
    }

    const totalSlides = this.totalSlides();

    let target = this.slider ? this.slider.currentSlide : 1;

    if (target > totalSlides) {
      target -= totalSlides;
    }

    if (target === 0) {
      target = totalSlides;
    }

    const anchor = this.carousel.parentNode.querySelector(
      `.carousel-indicator a[href="#${target}"]`
    );

    this.restartTimer();

    if (anchor.parentNode.querySelector('.active')) {
      anchor.parentNode.querySelector('.active').classList.remove('active');
    }

    anchor.classList.add('active');
  }

  componentDidMount() {
    this.initializeCarousel();
  }

  index(index) {
    return index + (this.isMobile() ? 1 : 0);
  }

  isMobile = _ =>
    window.matchMedia && window.matchMedia('(max-width: 600px)').matches;

  goto(e) {
    this.restartTimer();

    e.preventDefault();

    if (this.slider) {
      this.slider.goTo(e.target.getAttribute('href').replace('#', ''));
    }

    if (e.target.parentNode.querySelector('.active')) {
      e.target.parentNode.querySelector('.active').classList.remove('active');
    }
    e.target.classList.add('active');
  }

  render = () => (
    <div>
      <div className="carousel" ref={carousel => (this.carousel = carousel)}>
        {this.isMobile() ? (
          <div className="carousel-item carousel-item--text">
            <ul className="browser-default">
              {this.props.text.map((text, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </ul>
          </div>
        ) : (
          undefined
        )}
        {this.props.images.map((img, i) => (
          <div key={i} className="carousel-item">
            <img data-original={img} alt={this.props.text} />
            {/*<Icon src={img} alt={this.props.text} />*/}
          </div>
        ))}
      </div>
      {this.isMobile() || (!this.isMobile() && this.props.images.length > 1) ? (
        <div className="carousel-indicator">
          {this.isMobile() ? (
            <a onClick={this.goto.bind(this)} href="#1" className="active">
              1
            </a>
          ) : null}
          {this.props.images.map((img, index) => (
            <a
              key={index}
              href={'#' + (this.index(index) + 1)}
              onClick={this.goto.bind(this)}>
              {this.index(index) + 1}
            </a>
          ))}
        </div>
      ) : (
        undefined
      )}
    </div>
  );
}

export default Carousel;
