const $ = (window.jQuery = require('jquery'));
window.Vel = require('materialize-css/js/velocity.min');
require('materialize-css/js/hammer.min');
require('materialize-css/js/jquery.hammer');
require('materialize-css/js/global');
require('materialize-css/js/animation');
require('materialize-css/js/carousel');

const passiveListeners = () => {
  let supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}

  return supportsPassive ? { passive: true } : false;
};

const isInViewPort = el => {
  var win = $(window);

  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var elemtHeight = el.height(); // Get the full height of current element
  elemtHeight = Math.round(elemtHeight); // Round it to whole humber

  var bounds = el.offset(); // Coordinates of current element
  bounds.top = bounds.top + elemtHeight;
  bounds.right = bounds.left + el.outerWidth();
  bounds.bottom = bounds.top + el.outerHeight();

  return !(
    viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom
  );
};

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

  window.addEventListener('scroll', automateCarousel, passiveListeners());
};
