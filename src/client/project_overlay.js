import { passiveListeners } from './utils';

const OVERLAY_SELECTOR = '.pinned .overlay';

const projectOverlay = () => {
  const pinned = document.getElementsByClassName('pinned');

  if (
    pinned.length &&
    pinned[0].parentNode.nextSibling &&
    Math.abs(pinned[0].parentNode.getBoundingClientRect().top) <
      pinned[0].parentNode.offsetHeight
  ) {
    const opacity = Math.abs(
      pinned[0].parentNode.getBoundingClientRect().top /
        pinned[0].parentNode.offsetHeight
    );
    requestAnimationFrame(() => {
      if (document.querySelector(OVERLAY_SELECTOR)) {
        document.querySelector(OVERLAY_SELECTOR).style.opacity = opacity;
      }
    });
  } else {
    requestAnimationFrame(() => {
      if (document.querySelector(OVERLAY_SELECTOR)) {
        document.querySelector(OVERLAY_SELECTOR).style.opacity = 0;
      }
    });
  }
};

export default () => {
  window.addEventListener('scroll', projectOverlay, passiveListeners());
};
