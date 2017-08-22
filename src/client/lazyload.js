import LazyLoad from 'vanilla-lazyload';

import { pushpin } from './pushpin';

export default () => {
  new LazyLoad({
    callback_load: pushpin
  });
};
