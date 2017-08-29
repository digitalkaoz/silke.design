import lazyLoad from './client/lazyload';
import overlay from './client/overlay';

if (window.matchMedia) {
  document.addEventListener('DOMContentLoaded', _ => {
    lazyLoad();
    overlay();
  });
}
