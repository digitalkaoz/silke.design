const $ = (window.jQuery = require('jquery'));
require('materialize-css/js/pushpin');

const PROJECT_SELECTOR = '.project';

/**
 * called from lazy-load to correctly calculate sizes
 * @param {Node} el 
 */
const pushpin = el => {
  if ($(el).parents(PROJECT_SELECTOR).length === 0) {
    return;
  }

  $(PROJECT_SELECTOR).each(function() {
    var $this = $(this);
    var $target = $(this.parentNode);

    this.parentNode.setAttribute('style', `height: ${$this.outerHeight()}px`);

    const top = $target.offset().top;
    let bottom = top + $this.outerHeight();

    $this.pushpin({
      top: top,
      bottom: bottom
    });
  });
};

export default pushpin;
