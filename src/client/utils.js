/**
 * check for passive event listener caps
 */
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

/**
 * check if an element is completely in viewport
 */
export const isInViewPort = el => {
  const viewport = {
    top: document.documentElement.scrollTop,
    left: document.documentElement.scrollLeft,
    right: document.documentElement.scrollLeft + window.outerWidth,
    bottom: document.documentElement.scrollTop + window.outerHeight
  };

  const elementHeight = Math.round(el.outerHeight);
  const rect = el.getBoundingClientRect();

  let bounds = {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };

  bounds.top = bounds.top + elementHeight;
  bounds.right = bounds.left + el.outerWidth;
  bounds.bottom = bounds.top + el.outerHeight;

  return !(
    viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom
  );
};

/**
 * debounce a function 
 */
export const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
