import { passive, scrollTop } from './utils';

export default (element, options) => {
  const defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0
  };

  options = {
    ...defaults,
    ...options
  };

  const originalOffset = element.getBoundingClientRect().top + scrollTop();
  const listener = _ => updateElement(scrollTop() + options.offset);

  const removePinClasses = () => {
    element.classList.remove('pin-top');
    element.classList.remove('pinned');
    element.classList.remove('pin-bottom');
  };

  const wrap = () => {
    // Convert `elms` to an array, if necessary.

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    var child = document.createElement('div');
    child.classList.add('project-wrapper');
    child.style.height = element.getBoundingClientRect().height + 'px';

    // Cache the current parent and sibling.
    var parent = element.parentNode;
    var sibling = element.nextSibling;

    // Wrap the element (is automatically removed from its current
    // parent).
    child.appendChild(element);

    // If the element had a sibling, insert the wrapper before
    // the sibling to maintain the HTML structure; otherwise, just
    // append it to the parent.
    if (sibling) {
      parent.insertBefore(child, sibling);
    } else {
      parent.appendChild(child);
    }
  };

  const updateElement = scrolled => {
    /*console.log(
      element.getAttribute('id'),
      options,
      scrolled,
      element.classList
    );*/

    // Add position fixed (because its between top and bottom)
    if (
      options.top <= scrolled &&
      options.bottom >= scrolled &&
      !element.classList.contains('pinned')
    ) {
      window.requestAnimationFrame(_ => {
        if (!element.parentNode.classList.contains('project-wrapper')) {
          wrap();
        }
        removePinClasses();
        element.classList.add('pinned');
        element.style.top = options.offset;
      });
    }

    // Add pin-top (when scrolled position is above top)
    if (scrolled < options.top && !element.classList.contains('pin-top')) {
      window.requestAnimationFrame(_ => {
        removePinClasses();
        element.classList.add('pin-top');
        element.style.top = 0;
      });
    }

    // Add pin-bottom (when scrolled position is below bottom)
    if (
      scrolled > options.bottom &&
      !element.classList.contains('pin-bottom')
    ) {
      window.requestAnimationFrame(_ => {
        removePinClasses();
        element.classList.add('pin-bottom');
        element.style.top = options.bottom - originalOffset;
      });
    }
  };

  // Remove pushpin event and classes
  if (options === 'remove') {
    window.removeEventListener('scroll', listener);
    removePinClasses();
    element.removeAttribute('style');
    return false;
  }

  updateElement(scrollTop());

  window.addEventListener('scroll', listener, passive);
};
