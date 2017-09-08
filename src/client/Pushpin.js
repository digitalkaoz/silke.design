import { passive, scrollTop } from './utils';

export class Pushpin {
  defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0
  };

  element;
  originalOffset;

  constructor(element, options) {
    this.updateOptions(options);

    this.element = element;

    this.originalOffset =
      this.element.getBoundingClientRect().top + scrollTop();

    if (options === 'remove') {
      window.removeEventListener('scroll', this._listener.bind(this));
      this._removePinClasses();
      element.removeAttribute('style');
      element.removeAttribute('pushpin');
    } else {
      window.addEventListener('scroll', this._listener.bind(this) /*passive*/);

      this._updateElement(scrollTop());
    }
  }

  updateOptions(options) {
    this.options = {
      ...this.defaults,
      ...options
    };
  }

  _removePinClasses() {
    this.element.classList.remove('pin-top');
    this.element.classList.remove('pinned');
    this.element.classList.remove('pin-bottom');
  }

  _listener() {
    this._updateElement(scrollTop() + this.options.offset);
  }

  _wrap() {
    const parent = this.element.parentNode;
    const sibling = this.element.nextSibling;
    let child = document.createElement('div');

    child.classList.add('project-wrapper');
    child.style.height = this.element.getBoundingClientRect().height + 'px';
    child.appendChild(this.element);

    if (sibling) {
      parent.insertBefore(child, sibling);
    } else {
      parent.appendChild(child);
    }
  }

  _unwrap() {
    const wrapper = this.element.parentElement;
    while (wrapper.firstChild) wrapper.before(wrapper.firstChild);
    wrapper.remove();
  }

  _updateElement(scrolled) {
    this.element.parentNode.style.height =
      this.element.getBoundingClientRect().height + 'px';

    window.requestAnimationFrame(_ => {
      // Add position fixed (because its between top and bottom)
      if (
        this.options.top <= scrolled &&
        this.options.bottom >= scrolled &&
        !this.element.classList.contains('pinned')
      ) {
        /*if (!this.element.parentNode.classList.contains('project-wrapper')) {
          this._wrap();
        }*/
        this._removePinClasses();
        this.element.classList.add('pinned');
        this.element.style.top = this.options.offset;
      }

      // Add pin-top (when scrolled position is above top)
      if (
        scrolled < this.options.top &&
        !this.element.classList.contains('pin-top')
      ) {
        /*if (this.element.parentNode.classList.contains('project-wrapper')) {
          this._unwrap();
        }*/

        this._removePinClasses();
        this.element.classList.add('pin-top');
        this.element.style.top = 0;
      }

      // Add pin-bottom (when scrolled position is below bottom)
      if (
        scrolled > this.options.bottom &&
        !this.element.classList.contains('pin-bottom')
      ) {
        /*if (this.element.parentNode.classList.contains('project-wrapper')) {
          this._unwrap();
        }*/
        this._removePinClasses();
        this.element.classList.add('pin-bottom');
        this.element.style.top = this.options.bottom - this.originalOffset;
      }
    });
  }
}
