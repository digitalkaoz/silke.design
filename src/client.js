import lazyLoad from './client/lazyload';
import carousel from './client/carousel';

document.addEventListener('DOMContentLoaded', _ => {
  lazyLoad();
  carousel();
});
