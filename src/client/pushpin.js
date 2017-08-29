const $ = (window.jQuery = require('jquery'));

window.Vel = require('materialize-css/js/velocity.min');
require('materialize-css/js/global');
require('materialize-css/js/pushpin');

const PROJECT_SELECTOR = '.project';

/**
 * called from lazy-load to correctly calculate sizes
 * @param {Node} el 
 */
export const pushpin = el => {
  if ($(el).parents(PROJECT_SELECTOR).length === 0) {
    return;
  }

  $(PROJECT_SELECTOR).each(function() {
    var $this = $(this);
    var $target = $(this.parentNode);

    this.parentNode.setAttribute('style', `height: ${this.offsetHeight}px`);

    const top = $target.offset().top;
    let bottom = top + $this.outerHeight();

    $this.pushpin({
      top: top,
      bottom: bottom
    });
  });
};
