import { passiveListeners, debounce } from './utils';

const OVERLAY_CLASS = 'overlay';
const PINNED_CLASS = 'pinned';

class Overlay {
  process() {
    const pinned = document.getElementsByClassName(PINNED_CLASS);

    if (this.shouldIncrease(pinned)) {
      this.increaseOpacity(pinned[0]);
    }
  }

  shouldIncrease(pinned) {
    const parentNode = pinned.length ? pinned[0].parentNode : null;

    return (
      pinned.length &&
      parentNode &&
      parentNode.nextSibling &&
      Math.abs(parentNode.getBoundingClientRect().top) < parentNode.offsetHeight
    );
  }

  increaseOpacity(pinned) {
    const parentNode = pinned.parentNode;
    const opacity = Math.abs(
      parentNode.getBoundingClientRect().top / parentNode.offsetHeight
    );

    this.setOpacity(pinned, opacity);
  }

  setOpacity(element, opacity) {
    requestAnimationFrame(() => {
      const overlays = element.getElementsByClassName(OVERLAY_CLASS);

      if (overlays.length) {
        [].forEach.call(overlays, el => {
          el.style.opacity = opacity;
        });
      }
    });
  }
}

export default () => {
  const overlay = new Overlay();

  window.addEventListener(
    'scroll',
    debounce(overlay.process.bind(overlay), 10),
    passiveListeners()
  );
};
