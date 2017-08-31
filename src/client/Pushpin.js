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

  const originalOffset =
    element.parentNode.getBoundingClientRect().top + scrollTop();
  element.parentNode.style.height = `${element.getBoundingClientRect()
    .height}px`;
  const listener = _ => updateElement(scrollTop() + options.offset);

  const removePinClasses = () => {
    element.classList.remove('pin-top');
    element.classList.remove('pinned');
    element.classList.remove('pin-bottom');
  };

  const updateElement = scrolled => {
    //resize the parent in case the content changed
    /*if (
            element.getBoundingClientRect().height !==
            element.parentNode.getBoundingClientRect().height
        ) {
            element.parentNode.style.height = `${element.getBoundingClientRect()
        .height}px`;
            options.top = element.getBoundingClientRect().top + scrollTop();
        }*/

    console.log(
      element.getAttribute('id'),
      options,
      scrolled,
      element.classList
    );

    // Add position fixed (because its between top and bottom)
    if (
      options.top <= scrolled &&
      options.bottom >= scrolled &&
      !element.classList.contains('pinned')
    ) {
      window.requestAnimationFrame(_ => {
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
