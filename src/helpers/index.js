/**
 * Setup helpers to use from the 'api'
 */

import Joi from 'joi';
import AWS from './aws';
import routePrefixer from './routePrefixer';
import routerContainer from './routerContainer';

/**
 * List of all helpers used in app
 */
const helpers = {
  Joi,
  AWS,
  routePrefixer,
  routerContainer,
};

export default helpers;
