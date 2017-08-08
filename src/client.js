//export default () => {
const $ = (window.jQuery = require('jquery'));
require('materialize-css/js/jquery.hammer');
require('materialize-css/js/global');
require('materialize-css/js/animation');

require('materialize-css/js/carousel');

const LazyLoad = require('vanilla-lazyload');

$(_ => {
  $('.carousel').carousel({
    fullWidth: true,
    indicators: true
  });

  new LazyLoad();

  /*setInterval(
      _ =>
        requestAnimationFrame(_ => {
          $('.carousel').carousel('next');
        }),
      10000
    );*/
});
//}
