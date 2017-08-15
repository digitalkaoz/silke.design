//export default () => {
const $ = (window.jQuery = require('jquery'));
window.Vel = require('materialize-css/js/velocity.min');

require('materialize-css/js/jquery.hammer');
require('materialize-css/js/global');
require('materialize-css/js/animation');
require('materialize-css/js/carousel');
require('materialize-css/js/pushpin');

const LazyLoad = require('vanilla-lazyload');

$(_ => {
  $('.carousel').carousel({
    fullWidth: true,
    indicators: true
  });

  if (window.matchMedia('only screen and (max-width: 600px)').matches) {
    new LazyLoad({ threshold: document.body.offsetHeight * 2 });
  } else {
    new LazyLoad();
  }

  $('.project').each(function() {
    var $this = $(this);
    var $target = $(this.parentNode);

    this.parentNode.setAttribute('style', `height: ${$this.outerHeight()}px`);

    const top = $target.offset().top;
    let bottom = top + $this.outerHeight();

    $this.pushpin({
      top: top,
      bottom: bottom
    });
  });

  /*setInterval(
      _ =>
        requestAnimationFrame(_ => {
          $('.carousel').carousel('next');
        }),
      10000
    );*/
});
//}
