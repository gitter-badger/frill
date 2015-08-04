import {isArray as _isArray} from 'lodash';
import {isObject as _isObject} from 'lodash';

/**
 * @desc Prefixes route.path
 * @example
 * routePrefixer('/api', [{path: '/a'}, {path: '/b'}]);
 *
 * @param {string} prefix - A string to prefix paths
 * @param {Array|Object} routes - Collection of routes or a single route
 * @param {string} route.path - Collection of routes or a single route
 * @throws {Error} throw error when route.path doesn't exist
 * @throws {TypeError} throw error when route is not an Array
 * @return {Array}
 */
export default routePrefixer = (prefix, routes) => {
  let _routes = routes;
  if (_isObject(routes)) {
    if (!routes.path) {
      throw new Error('A route must have routes.path');
    }
    _routes = [_routes];
  }
  if (!_isArray(routes)) {
    throw new TypeError('Unable to prefix routes. route must be an Array');
  }
  return routes.map((route) => {
    route.path = prefix + route.path;
    return route;
  });
};
