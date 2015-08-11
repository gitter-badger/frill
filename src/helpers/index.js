/**
 * Setup helpers to use from the 'api'
 */

import AWS from './aws';
import routePrefixer from './routePrefixer';
import routerContainer from './routerContainer';

/**
 * List of all helpers used in app
 */
const helpers = {
  AWS,
  routePrefixer,
  routerContainer,
};

export default helpers;
