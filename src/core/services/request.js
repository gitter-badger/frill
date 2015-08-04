import _isFunction from 'lodash/lang/isFunction';
import _extend from 'lodash/object/extend';
import request from 'superagent';

export default (opts) => {
  if (opts && opts.prefix) {
    const patchRequest = (method) => {
      return (path, fn) => {
        if (_isFunction(fn)) {
          return request[method](opts.prefix + path, fn);
        }
        return request[method](opts.prefix + path);
      };
    };

    return _extend(request, {
      prefix: {
        get: patchRequest('get'),
        put: patchRequest('put'),
        post: patchRequest('post'),
        del: patchRequest('del'),
        patch: patchRequest('patch'),
      },
    });
  }

  return request;
};
