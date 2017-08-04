const $ = (window.jQuery = require('jquery'));
require('materialize-css/js/jquery.hammer');
require('materialize-css/js/global');
require('materialize-css/js/animation');
require('materialize-css/js/carousel');

$(_ => {
  $('.carousel').carousel({
    fullWidth: true,
    indicators: true
  });

  setInterval(
    _ =>
      requestAnimationFrame(_ => {
        $('.carousel').carousel('next');
      }),
    10000
  );
});
