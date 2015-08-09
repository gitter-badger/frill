/**
 * Setup helpers to use from the 'api'
 */

import Joi from 'joi';
import AWS from './aws';
import routePrefixer from './routePrefixer';

/**
 * List of all helpers used in app
 */
const helpers = {
  Joi,
  AWS,
  routePrefixer,
};

export default helpers;
