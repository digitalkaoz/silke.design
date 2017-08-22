import lazyLoad from './client/lazyload';
import carousel from './client/carousel';
import projectOverlay from './client/project_overlay';

if (window.matchMedia) {
  document.addEventListener('DOMContentLoaded', _ => {
    lazyLoad();
    carousel();
    projectOverlay();
  });
}
