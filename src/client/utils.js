const $ = (window.jQuery = require('jquery'));

export const passiveListeners = () => {
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

//TODO port to vanilla
export const isInViewPort = el => {
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
