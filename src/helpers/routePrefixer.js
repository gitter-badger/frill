import {isEmpty as _isEmpty} from 'lodash';
import {cloneDeep as _cloneDeep} from 'lodash';
import {isPlainObject as _isPlainObject} from 'lodash';
import {isString as _isString} from 'lodash';

/**
 * @desc Prefixes route.path
 * @example
 * routePrefixer('/api', [{path: '/a'}, {path: '/b'}]);
 *
 * @param {string} prefix - A string to prefix paths
 * @param {Array|Object} routes - Collection of routes or a single route
 * @param {string} route.path - Collection of routes or a single route
 * @throws {Error} throw error when given routes is not set or empty
 * @throws {Error} throw error when route.path doesn't exist in Object
 * @throws {Error} throw error when routes[x].route.path doesn't exist in Array
 * @throws {TypeError} throw error when prefix is not a String
 * @return {Array}
 */
const routePrefixer = (prefix, routes) => {
  if (!_isString(prefix)) {
    throw new TypeError('Prefix must be a string');
  }

  if (_isEmpty(routes)) {
    throw new Error('Must specify routes');
  }

  let _routes = _cloneDeep(routes);

  if (_isPlainObject(_routes)) {
    if (!_routes.path) {
      throw new Error('A route must have routes.path');
    }
    _routes = [_routes];
  }

  return _routes.map((route) => {
    if (!route.path) {
      throw new Error('All routes must contain route.path');
    }
    route.path = `${prefix}${route.path}`;
    return route;
  });
};

export default routePrefixer;
