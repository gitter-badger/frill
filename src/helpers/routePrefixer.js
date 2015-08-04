import {isArray as _isArray} from 'lodash';

export default (prefix, routes) => {
  if (!_isArray(routes)) {
    throw new TypeError('Unable to prefix routes. route must be an Array.');
  }
  return routes.map((route) => {
    route.path = prefix + route.path;
    return route;
  });
};
