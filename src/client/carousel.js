import { passiveListeners, isInViewPort } from './utils';

const $ = (window.jQuery = require('jquery'));
window.Vel = require('materialize-css/js/velocity.min');
require('materialize-css/js/hammer.min');
require('materialize-css/js/jquery.hammer');
require('materialize-css/js/global');
require('materialize-css/js/animation');
require('materialize-css/js/carousel');

let timers = {};

const automateCarousel = () => {
  Array.prototype.forEach.call(
    document.getElementsByClassName('carousel'),
    carousel => {
      if (isInViewPort($(carousel))) {
        if (
          !timers.hasOwnProperty(carousel.getAttribute('data-namespace')) &&
          carousel.getElementsByClassName('carousel-item').length > 1
        ) {
          const id = setInterval(
            _ =>
              requestAnimationFrame(_ => {
                $(carousel).carousel('next');
              }),
            5000
          );
          timers[carousel.getAttribute('data-namespace')] = id;
        }
      } else {
        if (timers.hasOwnProperty(carousel.getAttribute('data-namespace'))) {
          clearInterval(timers[carousel.getAttribute('data-namespace')]);
          delete timers[carousel.getAttribute('data-namespace')];
        }
      }
    }
  );
};

export default () => {
  $('.carousel').carousel({
    fullWidth: true,
    indicators: true
  });

  if (window.matchMedia && !window.matchMedia('(max-width: 600px)').matches) {
    window.addEventListener('scroll', automateCarousel, passiveListeners());
  }
};
